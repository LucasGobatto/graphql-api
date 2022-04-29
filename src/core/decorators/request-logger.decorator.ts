import { logger } from "@core/logger";

export function RequestLogger(className: string) {
  return function (target: any, method: string, property: PropertyDescriptor) {
    const originalMethod = property.value;

    return {
      value: async function (...args: any[]) {
        const logParams = {
          data: JSON.stringify(
            args.length > 0
              ? args?.reduce(
                  (arg: any, conc: any) => (conc = { ...conc, ...arg })
                )
              : {}
          ),
          method,
          className,
        };

        logger.log(logParams);
        try {
          return await originalMethod.apply(this, args);
        } catch (e) {
          const error = e as any;

          const logParams = {
            message: error.message,
            code: error?.code,
            details: error?.details,
          };

          logger.error(logParams);
          throw error;
        }
      },
    };
  };
}
