import { PropType, ref, watchEffect, Ref } from "vue";

/** Input Props Interface */
export interface InputProps {
  modelValue?: unknown;
}

/** Input Props Default */
export const inputPropsDefault: InputProps = {
  modelValue: null,
};

/** Input Props */
export const inputProps = {
  /** used for V-model */
  modelValue: {
    type: [String, Number, undefined] as unknown as PropType<
      InputProps["modelValue"]
    >,
    required: true,
  },
};

/** Input Events Interface */
export interface InputEmits {
  (e: "update:modelValue", value: unknown): void;
}
/** Input Events */
export const modelValueEvent = "update:modelValue";

/**
 * Hook for initializing inputs
 * @returns {object}
 */
export function useInput(emit: InputEmits): UseInput {
  /**
   * Emits an event to update the modelValue props (intended for v-model)
   * @param {event, *} value - The event/value to be emitted
   */
  function updateModelValue(value: unknown | Event) {
    let newVal: unknown;
    if (value instanceof Event) {
      const valueTarget = value.target as HTMLInputElement;
      newVal = valueTarget.value;
    } else {
      newVal = value;
    }
    emit("update:modelValue", newVal);
  }

  return { updateModelValue };
}
/** useInput Hook return type */
interface UseInput {
  updateModelValue: (payload: Event | unknown) => void;
}

/** Input Base Props Interface */
export interface InputBaseProps {
  type?: string;
  required?: boolean;
  name?: string;
  color?: string;
  label?: string;
  labelClass?: string;
  hideError?: boolean;
  error?: string | boolean;
  errorColor?: string;
}

/** Input Base Props Default */
export const inputBasePropsDefault: InputBaseProps = {
  type: "text",
  required: false,
  name: "",
  color: "primary-500",
  label: "",
  labelClass: "",
  hideError: false,
  error: "",
  errorColor: "error-500",
};

/** Input Base Props */
export const inputBaseProps = {
  /** Default input property "type" */
  type: {
    type: String as PropType<InputBaseProps["type"]>,
    default: inputBasePropsDefault.type,
  },
  /** Default input property "required" */
  required: {
    type: Boolean as PropType<InputBaseProps["required"]>,
    default: inputBasePropsDefault.required,
  },
  /** Default input property "name" */
  name: {
    type: String as PropType<InputBaseProps["name"]>,
    default: inputBasePropsDefault.name,
  },
  /** Color for the input field on hover */
  color: {
    type: String as PropType<InputBaseProps["color"]>,
    default: inputBasePropsDefault.color,
  },
  /** Label of the input field */
  label: {
    type: String as PropType<InputBaseProps["label"]>,
    default: inputBasePropsDefault.label,
  },
  /** Additional class for label */
  labelClass: {
    type: String as PropType<InputBaseProps["labelClass"]>,
    default: inputBasePropsDefault.labelClass,
  },
  /** Removes the tag for error */
  hideError: {
    type: Boolean as PropType<InputBaseProps["hideError"]>,
    default: inputBasePropsDefault.hideError,
  },
  /** Text to be displayed on error tag */
  error: {
    type: [String, Boolean] as PropType<InputBaseProps["error"]>,
    default: inputBasePropsDefault.error,
  },
  /** Color on error to be displayed on error */
  errorColor: {
    type: String as PropType<InputBaseProps["errorColor"]>,
    default: inputBasePropsDefault.errorColor,
  },
};

/**
 * Returns the props related to base input componetn
 *
 * @param {IinputProps} props - input props from component
 * @returns {Object}
 */
export function useBaseInputProps(props: InputBaseProps): {
  inputBasePropsWatcher: Ref<InputBaseProps>;
} {
  const inputBasePropsWatcher = ref<InputBaseProps>({} as InputBaseProps);

  watchEffect(() => (inputBasePropsWatcher.value.type = props?.type));
  watchEffect(() => (inputBasePropsWatcher.value.required = props?.required));
  watchEffect(() => (inputBasePropsWatcher.value.name = props?.name));
  watchEffect(() => (inputBasePropsWatcher.value.label = props?.label));
  watchEffect(
    () => (inputBasePropsWatcher.value.labelClass = props?.labelClass)
  );
  watchEffect(() => (inputBasePropsWatcher.value.error = props?.error));
  watchEffect(() => (inputBasePropsWatcher.value.hideError = props?.hideError));

  return {
    inputBasePropsWatcher,
  };
}
