import winston from 'winston';

export const makeLogger = (level?: string) => {
  return winston.createLogger({
    transports: new winston.transports.Console(),
    level: level || 'info',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.splat(),
      winston.format.printf(({ level, message, timestamp, ...metadata }) => {
        let msg = `${timestamp} [${level}] ${message} `;
        if (typeof metadata === 'object') {
          const metaProps: { [key: string]: unknown } = {};
          const errors = [];
          for (const key in metadata) {
            const prop = metadata[key];
            if (prop instanceof Error) {
              errors.push(prop);
            } else {
              metaProps[key] = prop;
            }
          }
          if (Object.keys(metaProps).length) {
            msg += JSON.stringify(metaProps);
          }
          for (const err of errors) {
            msg += `\n${err.name}: ${err.message}\n${err.stack}`;
          }
        } else if (metadata) {
          msg += `${metadata}`;
        }
        return msg;
      })
    ),
  });
};
