<template>
  <div
    class="group text-gray-500 transition-colors"
    :class="[`focus-within:text-${props.color}`, `hover:text-${props.color}`]"
  >
    <!-- Input Label -->
    <div class="text-sm text-left pointer-events-none">
      <span>{{ label }}</span>
      <span
        v-if="isRequired || props.required"
        class="text-red-500 pointer-events-none"
      >
        *
      </span>
    </div>

    <!-- Input Container -->
    <div
      class="p-1.5 flex items-center border rounded-sm transition-shadow bg-white overflow-hidden"
      :class="[
        `border-${hasError ? props.errorColor : 'gray-400'}`,
        `focus-within:ring-1 focus-within:ring-inset`,
        `ring-${hasError ? props.errorColor : props.color}`,
        `group-hover:border-${hasError ? props.errorColor : props.color}`,
        `focus-within:border-${hasError ? props.errorColor : props.color}`,
      ]"
    >
      <!-- Prepend Slot -->
      <div class="flex-shrink">
        <slot name="prepend"></slot>
      </div>
      <!-- Default Slot -->
      <div class="pl-1 pr-1 flex-grow text-black">
        <slot>
          <input
            class="outline-none w-full bg-transparent"
            :value="props.modelValue"
            :type="props.type"
            :name="props.name"
            @input="updateModelValue"
            @blur="checkError"
            v-bind="$attrs"
          />
        </slot>
      </div>
      <!-- Append Slot -->
      <div class="flex-shrink">
        <slot name="append"> </slot>
      </div>
    </div>

    <!-- Error Message -->
    <Error
      v-if="!props.hideError"
      sm
      :error="props.error || errorMessage"
      :color="props.errorColor"
    ></Error>
  </div>
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
const props = defineProps({
  ...inputProps,
  ...inputBaseProps,
  ...validationProps,
  modelValue: {
    type: undefined as unknown as PropType<unknown>,
    default: "",
    required: false,
  },
});

/** EMITS */
const emit = defineEmits([modelValueEvent, validEvent]);

/** HOOKS */
//useInput hook
const { updateModelValue } = useInput(emit);
//useValidation hook
const { modelValue } = toRefs(props);
const { isRequired, checkError, errorMessage } = useValidation(
  modelValue,
  props,
  emit
);

/******************************
COMPONENT STATE 
******************************/

const hasError = computed<boolean>(() => !!errorMessage.value || !!props.error);
</script>
