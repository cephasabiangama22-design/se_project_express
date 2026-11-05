const winston = require("winston");
const expressWinston = require("express-winston");

const messageFormat = winston.format.combine(
  winston.format.timmestamp(),
  winston.format.printf(
    ({ level, message, meta, timmestamp }) =>
      `${timestamp} ${level}: ${meta.error?.stack || message}`
  )
);

const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.Console({
      format: messageFormat,
    }),
    new winston.transports.File({
      filename: "request.log",
      format: winston.format.json(),
    }),
  ],
});

const errorLogger = expressWinston.errorLogger({
  transports: [new winston.transports.file({ filename: "error.log" })],

  format: winston.format.json(),
});

module.exports = {
  requestLogger,
  errorLogger,
};
