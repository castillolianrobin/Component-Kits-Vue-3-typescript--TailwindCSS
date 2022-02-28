<template>
  <Input
    v-bind="inputBasePropsWatcher"
    :error="errorMessage || inputBasePropsWatcher.error"
    :required="isRequired || inputBasePropsWatcher.required"
  >
    <!-- Input Element -->
    <DatePicker
      v-bind="$attrs"
      class="border-none outline-none"
      :value="modelValue"
      @onChange="updateModelValue"
      @blur="checkError"
    />

    <!-- Parent Slots -->
    <template v-slot:append><slot name="append"></slot></template>
    <template v-slot:prepend><slot name="prepend"></slot></template>
  </Input>
</template>

<script setup lang="ts">
import DatePicker from "vue3-date-time-picker";
/** Vue */
import { defineProps, defineEmits, toRefs, PropType } from "vue";
/** Form Components */
import { Input } from ".";
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
const props = defineProps({
  ...inputProps,
  ...inputBaseProps,
  ...validationProps,
  // modelValue: { type: Array as PropType<string[]>, default: () => [] },
  /** The name of the key that triggers to add the value */
  separator: { type: String as PropType<string>, default: "enter" },
});

/** EMITS */
const emit = defineEmits([modelValueEvent, validEvent]);

/** HOOKS */
//useInput hook
const { updateModelValue } = useInput(emit);
//useValidation hook
const { modelValue } = toRefs(props);
const { isRequired, errorMessage, checkError } = useValidation(
  modelValue,
  props,
  emit
);
//useBaseInputProps hook
const { inputBasePropsWatcher } = useBaseInputProps(props);
</script>

<style lang="scss">
$dp__input_padding: 0 !default; // padding in the input
$dp__input_icon_padding: 0 !default; // Padding on the left side of the input if icon is present

@import "vue3-date-time-picker/src/Vue3DatePicker/style/main.scss";

.dp__theme_light {
  --dp-border-color: transparent;
  --dp-menu-border-color: #ddd;
  --dp-border-color-hover: transparent;
}
</style>
