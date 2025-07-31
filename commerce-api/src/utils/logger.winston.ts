import winston, { format } from 'winston';

const loggerWinston = winston.createLogger({
  level: 'info',
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
  },
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.errors({ stack: true }),
    format.printf(({ level, message, stack, timestamp }) => {
      console.log(`[${level}] ${timestamp}: ${message} - ${stack}`);
      return `[${level}] ${timestamp}: ${message} - ${stack? stack : ''}`;
    })
  ),
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/info.log', level: 'info' }),
    new winston.transports.File({ filename: 'logs/http.log', level: 'http' }),
  ],
});

export default loggerWinston;
