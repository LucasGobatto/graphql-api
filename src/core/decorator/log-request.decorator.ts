export function LogRequest(className: string) {
  return function (
    _target: any,
    method: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    return {
      value: async function (...args: any[]) {
        try {
          const logParams = {
            data: JSON.stringify({ ...args }),
            method,
            className,
          };

          console.log("[LOG] -", logParams);

          return await originalMethod.apply(this, args);
        } catch (e) {
          const error = e as any;
          const baseError = {
            name: error.name,
            detail: error.details,
            code: error.code,
          };

          console.error("[ERROR] -", baseError);
          return baseError;
        }
      },
    };
  };
}
