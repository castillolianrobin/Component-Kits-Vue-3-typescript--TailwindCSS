import { consoleHelper } from "./";

export function checkPropsExist(
  props: { [key: string]: unknown },
  propNames: string[],
  rootFileName = "",
  consoleType = "warn"
): string[] {
  const filename = consoleHelper.getCallerName(2);

  // console.log(err.stack);
  const returnVal: string[] = [];
  propNames.forEach(function (name: string) {
    if (!(name in props)) {
      interface consoleInt {
        [key: string]: any;
      }
      (console as consoleInt)[consoleType](
        `${
          rootFileName && `${rootFileName}: `
        }Missing prop '${name}' on (${filename})`
      );
      returnVal.push(name);
    }
  });
  return returnVal;
}
