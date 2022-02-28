<template>
  <div class="relative" tabindex="0" @blur="active = false">
    <Input
      v-bind="inputBasePropsWatcher"
      :error="errorMessage || inputBasePropsWatcher.error"
      :required="isRequired || inputBasePropsWatcher.required"
      class="cursor-pointer"
      @click="active = !active"
    >
      <input
        class="w-full outline-none"
        readonly
        type="text"
        :value="modelValue"
        @change="checkError"
        v-bind="$attrs"
      />
      <!-- Dropdown Icon slot -->
      <template v-slot:append>
        <slot v-if="active" name="active-icon">
          <ChevronUpIcon class="app-icon"></ChevronUpIcon>
        </slot>
        <slot v-else name="inactive-icon">
          <ChevronDownIcon class="app-icon"></ChevronDownIcon>
        </slot>
      </template>
      <!-- Parent Slots -->
      <template v-slot:prepend><slot name="prepend"></slot></template>
    </Input>

    <!-- Select Items -->
    <transition name="items">
      <div
        v-if="active"
        class="absolute top-16 max-h-44 w-full overflow-auto bg-gray-50 shadow-lg z-50"
      >
        <div
          v-for="(item, index) in selectItems"
          :key="`select-item-${index}`"
          class="px-3 p-1 cursor-pointer hover:bg-gray-200 transition-colors"
          @click="updateModelValue(item.value)"
        >
          {{ item.text }}
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
/** vue */
import { defineProps, defineEmits, computed, ref, toRefs, PropType } from "vue";
/** icons */
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/vue/solid";
/** Form Components */
import { Input } from "./";
/** Composables */
import {
  useInput,
  inputProps,
  modelValueEvent,
  inputBaseProps,
  useBaseInputProps,
} from "@/common/composables/useInput";
import {
  validationProps,
  useValidation,
  validEvent,
} from "@/common/composables/useValidation";

/** PROPS */
interface PropItemsType {
  text?: string;
  value?: unknown;
}
const props = defineProps({
  ...inputProps,
  ...inputBaseProps,
  ...validationProps,
  items: {
    type: Array as PropType<PropItemsType[]>,
    default: () => [] as PropItemsType[],
  },
});

/** EMITS */
const emit = defineEmits([modelValueEvent, validEvent]);

/** HOOKS */
//useInput hook
const { updateModelValue: _updateModelValue } = useInput(emit);
//useValidation hook
const { modelValue } = toRefs(props);
const { isRequired, checkError, errorMessage } = useValidation(
  modelValue,
  props,
  emit
);
//useBaseInputProps hook
const { inputBasePropsWatcher } = useBaseInputProps(props);

/******************************
COMPONENT STATE 
******************************/

// Updates the modelValue to the first value on initialization
// const { items } = toRefs(props)
// if (!modelValue.value && items.value.length > 0) {
//   const firstVal = items.value[0];
//   _updateModelValue(firstVal.value || firstVal);
// }
// state of the select items
const active = ref(false);
// items to be displayed
const selectItems = computed<PropItemsType[]>(() => {
  return props.items.map((item: PropItemsType) => {
    const value = item.value || item.text;
    const text =
      item.text ||
      typeof item.value === "string" ||
      typeof item.value === "number"
        ? (item.value as string)
        : "undefined";
    return {
      value,
      text,
    };
  });
});
/**
 * Updates the value of the modelValue and closes the dropdown
 * @param {*} value - value to be provided
 */
function updateModelValue(value: unknown) {
  active.value = false;
  _updateModelValue(value);
}
</script>

<style lang="scss" scoped>
.items {
  &-enter-active,
  &-leave-active {
    transition: opacity 0.2s ease, max-height 0.3s ease;
  }
  &-enter-from,
  &-leave-to {
    opacity: 0;
    max-height: 0;
    // margin-top: -1.25rem;
  }
}
</style>
