<template>
  <!-- Primary label -->
  <span class="mb-1 text-sm text-gray-400">{{ primaryLabel }}</span>
  <span v-if="isRequired || required" class="ml-1 text-red-500">*</span>
  <!-- Checkbox Container -->
  <div
    v-for="(item, index) in dataSet"
    :key="`checkbox-${item.label + index}`"
    class="group flex items-center cursor-pointer"
    tabindex="0"
    @keypress="updateModelValue(item.value)"
    @click="updateModelValue(item.value)"
  >
    <!-- Icon -->
    <div
      class="p-2 inline-block rounded-full transition-colors"
      :class="[`group-hover:bg-${color} group-hover:bg-opacity-30`]"
    >
      <!-- Inactive State -->
      <slot v-if="!item.isChecked" name="inactive">
        <div class="ring-2 ring-inset rounded-full" :class="[`ring-${color}`]">
          <div class="app-icon-sm-semi opacity-0"></div>
        </div>
      </slot>
      <!-- Active State -->
      <slot v-else name="active">
        <div
          class="app-icon-sm-semi ring-2 ring-inset rounded-full p-1"
          :class="[`ring-${color}`]"
        >
          <div
            class="w-full h-full text-white rounded-full"
            :class="`bg-${color}`"
          ></div>
        </div>
      </slot>
    </div>
    <!-- Label -->
    <div
      class="inline-block transition-colors"
      :class="[
        item.isChecked
          ? `text-${color} text-opacity-80 font-semibold group-hover:font-semibold`
          : ``,
        `group-hover:text-${color}`,
      ]"
    >
      <!-- Item Label -->
      <span class="text-sm select-none">{{ item.label }}</span>
    </div>
  </div>
  <!-- Error -->
  <Error
    v-if="!hideError"
    sm
    :error="error || errorMessage"
    :color="errorColor"
  ></Error>
</template>

<script setup lang="ts">
/** Vue */
import { defineProps, defineEmits, toRefs, computed, PropType } from "vue";
/** Form Components */
import { Error } from "./";
/** Composables */
import {
  useInput,
  inputProps,
  modelValueEvent,
  inputBaseProps,
} from "../../composables/useInput";
import {
  validationProps,
  useValidation,
  validEvent,
} from "../../composables/useValidation";

/** Props */
interface ItemProp {
  value: unknown;
  label: string;
}
const props = defineProps({
  ...inputProps,
  ...inputBaseProps,
  ...validationProps,
  modelValue: {
    type: [Boolean, Array, String, Number, undefined] as PropType<
      boolean | string | number | unknown[] | unknown
    >,
    default: false,
  },
  primaryLabel: { type: String as PropType<string>, default: null },
  items: { type: Array as PropType<Array<ItemProp>>, default: () => [] }, // [ { value: '', label: '' }, ]
});

/** EMITS */
const emit = defineEmits([modelValueEvent, validEvent]);

/** HOOKS */
//useInput hook
const { updateModelValue: _updateModelValue } = useInput(emit);
//useValidation hook
const { modelValue } = toRefs(props);
const { isRequired, errorMessage } = useValidation(modelValue, props, emit);

/******************************
 COMPONENT STATE 
 ******************************/

/** checks whether rthere is a set of items to be displayed as checkbox  */
const isMultiple = computed(() => {
  return props.items.length > 0;
});

/**
 * Handles the data to be displayed as checkbox
 * @returns {Array<Object>} Object properties: { value, label, }
 */
const dataSet = computed<DataSetItem[]>((): DataSetItem[] => {
  if (isMultiple.value) {
    return props.items.map(
      (item): DataSetItem => ({
        value: item.value,
        label: item.label,
        isChecked: props.modelValue === item.value,
      })
    );
  } else {
    return [
      {
        value: null,
        label: props.label || "",
        isChecked: props.modelValue,
      },
    ];
  }
});
interface DataSetItem {
  value: unknown;
  label: string;
  isChecked: boolean;
}

/**
 * Extends the useInput's updateModelValue
 * @param { String } value - The value to be added/removed to the modelValue
 *                          (to be used when there are multiple checkboces)
 */
function updateModelValue(value: unknown = null) {
  if (isMultiple.value) {
    _updateModelValue(value);
  } else {
    _updateModelValue(!props.modelValue);
  }
}
</script>
