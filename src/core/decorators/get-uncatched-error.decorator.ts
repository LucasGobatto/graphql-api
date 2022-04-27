import { DataSourceError, GenericTypeError } from "@core/error";

type ErrorDecorator = (
  type: Object,
  method: string,
  descriptor: PropertyDescriptor
) => {
  value: (...args: any[]) => Promise<any>;
};

export function GetUncatchedError(error?: string): ErrorDecorator;
export function GetUncatchedError(error?: GenericTypeError): ErrorDecorator;
export function GetUncatchedError(
  error?: GenericTypeError | string
): ErrorDecorator {
  return function (_: Object, __: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    return {
      value: async function (...args: any[]) {
        try {
          return await originalMethod.apply(this, args);
        } catch (e) {
          const uncatchedError = e as Error;

          if (error) {
            if (typeof error === "string") {
              throw new DataSourceError(error);
            } else {
              throw new error();
            }
          }

          throw new DataSourceError(uncatchedError.message);
        }
      },
    };
  };
}
