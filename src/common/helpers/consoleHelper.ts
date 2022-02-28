export function getCallerName(stack = 1) {
  function getErrorObject() {
    try {
      throw Error("");
    } catch (err: unknown) {
      return err;
    }
  }

  const err = getErrorObject() as any;
  const caller_line = err.stack.split("\n")[stack + 3];
  let filename = caller_line.split("/").pop();
  filename = filename.split("?").shift();
  return filename;
}
