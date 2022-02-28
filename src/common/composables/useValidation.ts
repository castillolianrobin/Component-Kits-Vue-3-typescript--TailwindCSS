import {
  computed,
  ComputedRef,
  inject,
  PropType,
  provide,
  Ref,
  ref,
  toRefs,
  watch,
} from "vue";
import * as validation from "../helpers/validation";

/** Validation Props Interface */
export interface ValidationProps {
  validations?: string | (() => Array<void>);
  validate?: number | string | boolean | Array<unknown>;
  valid?: boolean;
  validateOnChange?: boolean;
  name?: string;
}

/** Validation Props Default */
export const validationPropsDefault: ValidationProps = {
  validations: function (): Array<void> {
    return new Array<void>();
  },
  validate: false,
  valid: false,
  validateOnChange: false,
  name: "",
};

/** Validation Props */
export const validationProps = {
  /** List of validation to be checked */
  validations: {
    type: [String, Array] as PropType<ValidationProps["validations"]>,
    default: validationPropsDefault.validations,
  },
  /** Reserved prop for AppForm.vue */
  validate: {
    type: [Number, String, Boolean, Array] as PropType<
      ValidationProps["validate"]
    >,
    default: validationPropsDefault.validations,
  },
  /** Prop for checking if input is valid */
  validateOnChange: {
    type: Boolean as PropType<ValidationProps["validateOnChange"]>,
    default: validationPropsDefault.validateOnChange,
  },
  /** Flag whether to activate the validation on value changue */
  valid: {
    type: Boolean as PropType<ValidationProps["valid"]>,
    default: validationPropsDefault.valid,
  },
  /** Name of the input field ( will be used as label for displaying error ) */
  name: {
    type: String as PropType<ValidationProps["name"]>,
    default: "",
  },
};

/** Validation Emit Interface */
export interface ValidationEmits {
  (e: "update:valid", flag: boolean): void;
}

/** Validation Emit Interface */
export const validEvent = "update:valid";

/**
 * Hook for validating input values
 * @param value - Value to be validated. (must be reactive)
 * @param props - Validation props from component
 * @param context - Context from component (needed for emitting events)
 * @param autoValidate - Whether to validate the value automatically on change
 */
export function useValidation(
  value: Ref<unknown> | undefined,
  props: ValidationProps & FormValidationsProps,
  emit: ValidationEmits,
  autoValidate:
    | Ref<boolean | undefined>
    | boolean = false /** remove autovalidate and check on the props instead */
): UseValidation {
  /** Props to be utilized by the hook */
  const { validateOnChange, validations, name } = toRefs(props);

  /** Error message to be displayed */
  const errorMessage = ref<string | boolean>("");

  /**
   * LOCAL VARIABLE:
   *  returns all the set of validation functions based on validation props
   */
  const _validationArr = computed<Array<CallableFunction>>(() => {
    if (typeof validations?.value === "string") {
      const VALIDATION_NAMES = validations?.value.split("|") || "";
      const VALIDATIONS = [];
      for (let i = 0; i < VALIDATION_NAMES.length; i++) {
        const validationName = VALIDATION_NAMES[i].trim();
        if (validationName in validation) {
          VALIDATIONS.push(
            (validation as { [key: string]: CallableFunction })[validationName]
          );
        } else if (validationName) {
          console.error(
            `useValidation: Unknown validation "${validationName}"`
          );
          return [];
        }
      }
      return VALIDATIONS;
    } else if (Array.isArray(validations?.value)) {
      return validations?.value || [];
    } else {
      return [];
    }
  });

  /**
   * Returns whether there is "required" validation on the validations property
   */
  const isRequired = computed<boolean>(() => {
    if (typeof validations?.value === "string") {
      return validations?.value?.split("|").includes("required");
    } else {
      return (
        _validationArr.value.filter((rule) => {
          if (typeof rule() === "function") {
            const innerRule = rule("");
            return innerRule("").toString().includes("shouldn't be empty.");
          } else {
            return rule("").toString().includes("shouldn't be empty.");
          }
        }).length > 0
      );
    }
  });

  /**
   * Validates the given value based on the set of validation props
   * @returns error message of the validation else return false
   */
  function validateValue(val: unknown): string | boolean {
    const rules = _validationArr.value;
    const _value = val;
    const _name = name?.value || "";
    for (let i = 0; i < rules.length; i++) {
      const rule = rules[i];
      let validate = false;
      if (typeof rule() === "function") {
        const innerRule = rule();
        validate = _name ? innerRule(_value, _name) : innerRule(_value);
      } else {
        validate = _name ? rule(_value, _name) : rule(_value);
      }
      if (validate !== true) {
        return validate;
      }
    }
    return false;
  }

  /**
   * Checks for error and update the errorMessage's value accordingly
   * @param {*} val - Value to be checked
   */
  function checkError(val: unknown = false): string | boolean {
    let _val: unknown;
    if (val) {
      _val = val instanceof Event ? (<HTMLInputElement>val.target).value : val;
    } else {
      _val = value?.value;
    }
    return (errorMessage.value = validateValue(_val) || "");
  }

  /** if true, activates error checking upon value change  */
  if ((validateOnChange?.value || autoValidate) && value !== undefined) {
    watch(value, () => checkError(value.value));
  }

  /**
   * Emits an event to update the valid props (intended for v-model)
   * @param {Boolean} value the value to be emitted
   */
  function updateValid(flag: boolean) {
    emit("update:valid", flag);
  }

  /**
   * This script utilizes the initForm() hook's logic
   * Adds validation via initForm()'s providers
   */
  const formValidationKey: boolean | string = inject(
    "formValidationKey",
    false
  );
  const { ignoreFormValidation } = toRefs(props);
  if (!ignoreFormValidation && formValidationKey !== false) {
    const formAddInput = inject("formAddInput", () => null);
    const formAddValidInput = inject("formAddValidInput", () => null);
    const formAddError = inject(
      "formAddError",
      (error: string | boolean) => error
    );
    formAddInput();
    watch(formValidationKey, () => {
      checkError(value?.value);
      errorMessage.value && formAddError(errorMessage.value);
      formAddValidInput();
    });
  }

  return {
    isRequired,
    validateValue,
    checkError,
    errorMessage,
    updateValid,
  };
}
/** useValidation interface */
interface UseValidation {
  isRequired: ComputedRef<boolean>;
  validateValue: (val: unknown) => string | boolean;
  checkError: (val?: unknown) => string | boolean;
  errorMessage: Ref<string | boolean>;
  updateValid: (flag: boolean) => void;
}

/********************************
 * FORM SPECIFIC HOOKS AND LOGICS
 *******************************/

/** initForm PREREQUISITES */

/** Form Props Type */
export interface FormValidationsProps {
  ignoreFormValidation?: boolean;
}

/** Form Props Default */
export const formValidationPropsDefault: FormValidationsProps = {
  ignoreFormValidation: false,
};

/** Form Props */
export const formValidationProps = {
  /** Flag whether to validate on <AppForm></AppForm> submit */
  ignoreFormValidation: {
    type: Boolean as PropType<FormValidationsProps["ignoreFormValidation"]>,
    default: formValidationPropsDefault.ignoreFormValidation,
  },
};

/** emit type used by initForm hook */
export interface formEmits {
  (e: "validated", flag: string[]): void;
}

export const validatedEvent = "validated";

/** initForm HOOK */

/**
 * Initalizes the form component to be used for validating input components.
 * The useValidation() hook has script intended to utilize this hook
 *
 * @param {Object} context context from component (needed for emitting events)
 * @returns {Object}
 */
export function initForm(emit: formEmits): InitForm {
  /** List of Errors */
  const errors = ref<string[]>([]);

  function resetError() {
    errors.value = [];
  }

  function addError(error: string) {
    errors.value.push(error);
  }
  /**
   * Provider for inputs:
   * Add error caught by inputs upon form validation
   */
  provide("formAddError", addError);

  /** Number of inputs included in the checking */
  const inputCtr = ref(0);
  function addInput() {
    inputCtr.value += 1;
  }
  /**
   * Provider for inputs:
   * Grants input to be included in the validation
   */
  provide("formAddInput", addInput);

  /** Number of inputs validated upon checking */
  const validInputCtr = ref(0);
  function addValidInput() {
    validInputCtr.value += 1;
  }
  /**
   * Provider for inputs:
   * Flags the form that an input has been validated
   */
  provide("formAddValidInput", addValidInput);

  /**
   * Emits validated event
   * @param {*} _errors - Errors to emit upon validation
   */
  function emitValidated(_errors: boolean | string[] = false) {
    if (!_errors) {
      emit("validated", errors.value);
    } else {
      emit("validated", _errors as string[]);
    }
  }

  /**
   * watch if number of inputs validated is equal to inputs included,
   */
  watch(validInputCtr, () => {
    if (inputCtr.value === validInputCtr.value) {
      emitValidated();
    }
  });

  /**
   * Validation key:
   * Sends the flag for the input to activate validation
   */
  const validationKey = ref("");
  /**
   * Provider for inputs:
   * Will be watched by input to activate validation
   */
  provide("formValidationKey", validationKey);
  function startFormValidation() {
    resetError();
    validInputCtr.value = 0;
    validationKey.value = `val-key-${Math.random() * 10}`;
  }

  return {
    errors,
    inputCtr,
    validInputCtr,
    validationKey,
    startFormValidation,
    emitValidated,
  };
}
interface InitForm {
  errors: Ref<string[]>;
  inputCtr: Ref<number>;
  validInputCtr: Ref<number>;
  validationKey: Ref<string>;
  startFormValidation: () => void;
  emitValidated: (_errors?: boolean | string[]) => void;
}
