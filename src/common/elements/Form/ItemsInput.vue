<template>
  <Input
    v-bind="inputBasePropsWatcher"
    :error="errorMessage || inputBasePropsWatcher.error"
    :required="isRequired || inputBasePropsWatcher.required"
  >
    <div class="flex">
      <div class="inline-flex flex-wrap mr-1">
        <div
          v-for="(item, index) in modelValue"
          :key="`app-input-item-${item}-${index}`"
          class="px-1 m-0 mb-1 ml-1 bg-gray-dark-6 text-body-2 text-white bg-gray-400 rounded inline-flex items-center content-center break-words"
          style="word-break: break-word"
        >
          <span>{{ item }}</span>
          <XIcon
            class="ml-1 app-icon-sm cursor-pointer hover:text-primary-300"
            @click="removeItem(index)"
          ></XIcon>
        </div>
      </div>
      <input
        type="text"
        class="outline-none flex-shrink flex-grow"
        :value="inputValue"
        v-bind="$attrs"
        @keydown="onInputKeydown"
        @blur="checkError"
      />
    </div>

    <!-- Parent Slots -->
    <template v-slot:append><slot name="append"></slot></template>
    <template v-slot:prepend><slot name="prepend"></slot></template>
  </Input>
</template>

<script setup lang="ts">
/** Icons */
import { XIcon } from "@heroicons/vue/solid";
/** Vue */
import { defineProps, defineEmits, toRefs, ref, PropType } from "vue";
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
  modelValue: { type: Array as PropType<string[]>, default: () => [] },
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

// holds the value of the input tag
const inputValue = ref("");

/**
 * Handles the keypress in the input tag and
 * updates the modelValue if the separator key has been pressed
 */
function onInputKeydown(e: KeyboardEvent) {
  const keyPressed = e.key.toLowerCase();
  const keySeparator = (props.separator || "").toLowerCase();
  const _value = (e.target as HTMLInputElement).value;
  if (keyPressed === keySeparator) {
    e.preventDefault();
    inputValue.value = "";
    updateModelValue([...modelValue.value, _value]);
  } else {
    inputValue.value = _value;
  }
}

/**
 * Removes item in the modelValue
 */
function removeItem(index: number) {
  const _modelValue = modelValue.value;
  _modelValue.splice(index, 1);
  updateModelValue(_modelValue);
}
</script>
