import winston, { format, addColors, createLogger } from 'winston';
import { LOGGER } from '../constant';
import { getLogMessage } from '../utils';
const { combine, timestamp, printf, colorize, simple } = format;

const logger = createLogger({
  transports: [
    new winston.transports.Console({
      format: combine(
        timestamp({
          format: LOGGER.FORMAT,
        }),
        simple(),
        printf(getLogMessage),
        colorize({ all: true })
      ),
    }),
  ],
});
addColors(LOGGER.COLORS);

export { logger };
