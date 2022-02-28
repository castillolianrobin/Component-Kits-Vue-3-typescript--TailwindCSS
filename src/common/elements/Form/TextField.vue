<template>
  <Input
    v-bind="inputBasePropsWatcher"
    :error="errorMessage || inputBasePropsWatcher.error"
    :required="isRequired || inputBasePropsWatcher.required"
  >
    <input
      class="w-full outline-none"
      :value="inputVal"
      :type="inputType"
      @input="onInputChange"
      @blur="checkError"
      v-bind="$attrs"
    />
    <!-- Parent Slots -->
    <template v-slot:append><slot name="append"></slot></template>
    <template v-slot:prepend><slot name="prepend"></slot></template>
  </Input>
</template>

<script setup lang="ts">
/** Vue */
import {
  defineProps,
  defineEmits,
  toRefs,
  PropType,
  ref,
  watch,
  computed,
} from "vue";
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
  type: {
    type: String as PropType<
      "text" | "password" | "decimal" | "decimalText" | "number" | ""
    >,
    default: "text",
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
//useBaseInputProps hook
const { inputBasePropsWatcher } = useBaseInputProps(props);

/******************************
COMPONENT STATE 
******************************/

/** INPUT LOGIC */

// input element type attr
const inputType = computed<string>(() => {
  switch (props.type) {
    case "password":
      return "password";
    case "number":
      return "number";
    default:
      return "text";
  }
});

// value of the input element
const inputVal = ref<string>("");
// handles the onChange event of the input element
function onInputChange(e: Event) {
  const _value = (e.target as HTMLInputElement).value;
  handleInputValue(_value);
  handleModelValue(_value);
}
/**
 * (LOCAL) parse the inputVal and pass to modelValue
 * @param value = value of the input element
 */
function handleModelValue(value: string) {
  let newVal: string | number;
  switch (props.type) {
    case "decimal":
      newVal = toNumber(value);
      break;
    case "decimalText":
      newVal = toDecimal(value);
      break;
    default:
      newVal = value;
  }
  updateModelValue(newVal);
}
/**
 * (LOCAL) parse the modelValue and pass to inputVal
 * @param value = value of the modelValue
 */
function handleInputValue(value: string) {
  let newVal: string;
  switch (props.type) {
    case "decimal":
    case "decimalText":
      newVal = toDecimal(value).toString();
      break;
    default:
      newVal = value;
      break;
  }
  inputVal.value = "";
  inputVal.value = newVal;
}
// watch modelValue change and update the value of the input to it's decimal form
watch(
  () => props.modelValue,
  (val) => {
    if (typeof val === "string" || typeof val === "number") {
      handleInputValue(val.toString());
    } else {
      handleInputValue("");
    }
  },
  { immediate: true }
);

/** CONVERSION FUNCTIONS */

/**
 * Converts String number to decimal
 * @param {String, Number} val Value that holds the number to be converted and filtered to decimal
 * @returns {String}
 */
function toDecimal(val: string | number) {
  if (
    (typeof val === "string" && isNaN(parseFloat(val))) ||
    (typeof val === "number" && isNaN(val)) ||
    !val
  ) {
    return 0;
  } else {
    // filters non decimal characters
    let _numVal = parseFloat(val.toString().replace(/,/g, ""));
    // the actual decimal value
    let _decimalString = _numVal.toLocaleString("en");
    // get decimal position
    const decimalPos = val.toString().indexOf(".");
    if (decimalPos >= 0) {
      const decimalLength = val.toString().substring(decimalPos).length - 1;
      if (decimalLength > 0) {
        _decimalString = _numVal.toLocaleString("en", {
          minimumFractionDigits: decimalLength < 6 ? decimalLength || 1 : 6,
          maximumFractionDigits: 6,
        });
      } else {
        _decimalString = `${_decimalString}.`;
      }
    }
    return _decimalString;
  }
}

/**
 * Converts String decimal to number
 * @param val Value that holds the decimal to be converted and filtered to number
 * @returns {number}
 */
function toNumber(val: string): number {
  let _numVal = parseFloat(val.toString().replace(/,/g, ""));
  if (isNaN(_numVal)) {
    return 0;
  } else {
    return _numVal;
  }
}
</script>

<style scoped></style>
