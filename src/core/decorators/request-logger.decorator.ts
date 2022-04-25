export function RequestLogger(className: string) {
  return function (target: any, method: string, property: PropertyDescriptor) {
    const originalMethod = property.value;

    return {
      value: async function (...args: any[]) {
        const logParams = {
          data: JSON.stringify({ ...args }), // todo: fix this
          method,
          className,
        };

        console.log("[LOG] -", logParams);
        try {
          return await originalMethod.apply(this, args);
        } catch (e) {
          const error = e as any;

          const logParams = {
            message: error.message,
            code: error?.code,
            details: error?.details,
          };

          console.error("[ERROR] -", logParams);
          throw error;
        }
      },
    };
  };
}
