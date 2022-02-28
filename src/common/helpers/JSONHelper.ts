export function stringToJSON(
  value: string | null,
  defaultVal: [] | Record<string, string> | null = null
): [] | Record<string, string> | null {
  // (value.includes('{') || value.includes('['))
  if (!value) {
    return defaultVal;
  } else {
    try {
      return JSON.parse(value);
    } catch (e) {
      return defaultVal;
    }
  }
}
