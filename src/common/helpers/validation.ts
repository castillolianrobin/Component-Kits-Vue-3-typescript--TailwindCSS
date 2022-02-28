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
 * Validates if field should be atleast a certain number of character long
 *
 * @param count Number of minimum character
 * @param name Name of the field
 * @returns boolean: true | string: error message
 */
export function min(count: number, name = ""): Validation {
  return (value: string) => {
    return (
      value.length > count ||
      `${name || "This"} field must be atleast ${count} characters long.`
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
export function max(count: number, name = ""): Validation {
  return (value: string) => {
    return (
      value.length < count ||
      `${name || "This"} field must not exceed ${count} characters long.`
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
 * Typescript interface for validation types
 * ( Do not touch )
 */
interface Validation {
  (value: string): boolean | string;
}
