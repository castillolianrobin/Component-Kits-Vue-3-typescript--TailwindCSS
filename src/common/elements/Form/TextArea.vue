<template>
  <Input
    v-bind="inputBasePropsWatcher"
    :error="errorMessage || inputBasePropsWatcher.error"
    :required="isRequired || inputBasePropsWatcher.required"
  >
    <!-- Input Element -->
    <textarea
      class="w-full outline-none"
      :value="modelValue"
      @input="updateModelValue"
      @blur="checkError"
      v-bind="$attrs"
      :style="{ minHeight }"
    />
    <!-- Shadow text area element -->
    <textarea
      ref="textAreaHeightReference"
      :value="modelValue"
      class="absolute max-h-0 pointer-events-none opacity-0 m-0"
    />
    <!-- Parent Slots -->
    <template v-slot:append><slot name="append"></slot></template>
    <template v-slot:prepend><slot name="prepend"></slot></template>
  </Input>
</template>

<script setup lang="ts">
/** Vue */
import { defineProps, defineEmits, toRefs, ref, watch } from "vue";
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
const props = defineProps({
  ...inputProps,
  ...inputBaseProps,
  ...validationProps,
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
//useBaseInputProps hook
const { inputBasePropsWatcher } = useBaseInputProps(props);

/******************************
COMPONENT STATE 
******************************/

// minimum height for the text area
const minHeight = ref<number | string>(0);
// refs for hidden text area that computes the height
const textAreaHeightReference = ref<HTMLInputElement>();

// auto height logic for text area
watch(
  () => props.modelValue,
  () => {
    if (textAreaHeightReference.value) {
      minHeight.value = `${textAreaHeightReference.value.scrollHeight}px`;
    }
  }
);
</script>
