/**
 * ==============================================================
 * COMMON VALIDATION CASE
 * ==============================================================
 */

/**
 * Validates if field is required
 *
 * @param name Name of the field
 * @returns boolean: true | string: error message
 */
export function required(name = ""): Validation {
  return (value: string) => {
    return !!value || `${name || "This"} field shouldn't be empty.`;
  };
}

/**
 * Validates if field should be number is atleast a certain number minimum
 *
 * @param min Minimum number
 * @param name Name of the field
 * @returns boolean: true | string: error message
 */
export function min(min: number, name = ""): Validation {
  return (value, fieldName = name) => {
    return (
      parseFloat(value) >= min ||
      `${fieldName || "This"} field must be equal or greater than ${min}.`
    );
  };
}

/**
 * Validates if field should be number not exceed the given maximum number
 *
 * @param max Maximum number
 * @param name Name of the field
 * @returns boolean: true | string: error message
 */
export function max(max: number, name = ""): Validation {
  return (value, fieldName = name) => {
    return (
      parseFloat(value) <= max ||
      `${fieldName || "This"} field must be equal or less than ${max}.`
    );
  };
}

/**
 * Validates if field should be atleast a certain number of character long
 *
 * @param count Number of minimum character
 * @param name Name of the field
 * @returns boolean: true | string: error message
 */
export function minLength(count: number, name = ""): Validation {
  return (value, fieldName = name) => {
    return (
      (value && value.length >= count) ||
      `${fieldName || "This"} field must be atleast ${count} characters long.`
    );
  };
}

/**
 * Validates if field shouldn't exceed a certain number of character long
 *
 * @param count Number of maximum character
 * @param name Name of the field
 * @returns boolean: true | string: error message
 */
export function maxLength(count: number, name = ""): Validation {
  return (value, fieldName = name) => {
    return (
      (value && value.length < count) ||
      `${fieldName || "This"} field must not exceed ${count} characters long.`
    );
  };
}

/**
 * ==============================================================
 * OPTIONAL VALIDATION CASES
 * ==============================================================
 */

/**
 * Validates if field should only be a number type
 *
 * @param name name of the field
 * @returns boolean: true | string: error message
 */
export function numberOnly(name = ""): Validation {
  return (value: string) => {
    return /^\d+$/.test(value) || `${name || "This"} field must be a number`;
  };
}

/**
 * Validates if field should only contain alphabet letters
 *
 * @param name Name of the field
 * @returns boolean: true | string: error message
 */
export function alphaOnly(name = ""): Validation {
  return (value: string) => {
    return (
      /^([A-Za-z]*)$/.test(value) ||
      `${name || "This"} field should only contain alphabet letters`
    );
  };
}

/**
 * Validates if field shouldn't have any number
 *
 * @param name name of the field
 * @returns boolean: true | string: error message
 */
export function noNumber(name = ""): Validation {
  return (value: string) => {
    return (
      /^([^0-9]*)$/.test(value) ||
      `${name || "This"} field shouldn't have any number character`
    );
  };
}

/**
 * ==============================================================
 * SPECIAL RULE NAMING FUNCTION
 * ==============================================================
 */
// export function nameValidations(name, validations) {
//   return validations.map(validation => )
// }

/**
 * Validates that field is required
 *
 * @param name Name of the field
 * @returns boolean: true | string: error message
 */
export function matchString(
  stringMatch: string,
  stringFieldName = "",
  name = ""
): Validation {
  return (value, fieldName = name) => {
    console.log(value, stringMatch);
    return (
      value === stringMatch ||
      `${fieldName || "This"} field should match with${
        `${stringFieldName} field` || "The string"
      }`
    );
  };
}

/**
 * Validates that field is a valid US phone number
 * Valid formats:
 *  +1 123 4567890
 *  +11234567890
 *  +1(123)4567890
 *  +1(123)456-7890
 *  +1 (123) 456-7890
 *  +1 (123)456 7890
 *  +1 123 456-7890
 *  +1 123 456 7890
 *  +1 123-456-7890
 *  123-456-7890
 *  123 456-7890
 *  123 456 7890
 *  123 4567890
 *  1234567890
 *
 * @see https://stackoverflow.com/questions/4338267/validate-phone-numberwith-javascript
 *
 * @param name Name of the field
 * @returns boolean: true | string: error message
 */
export function usPhoneNum(name = ""): Validation {
  return (value, fieldName = name) => {
    return (
      /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im.test(value) ||
      `${fieldName || "This"} field is not a valid phone number`
    );
  };
}

/**
 * Typescript interface for validation types
 * ( Do not touch )
 */
interface Validation {
  (value: string): boolean | string;
}
