const {
  NOT_FOUND_ERROR_CODE,
  BAD_REQUEST_ERROR_CODE,
  SERVER_ERROR_CODE,
} = require("../utils/errors");

const errorHandler = (err, req, res, next) => {
  console.error(err);
  let statusCode = err.statusCode || SERVER_ERROR_CODE;

  if (err.name === "DocumentNotFoundError") {
    statusCode = NOT_FOUND_ERROR_CODE;
  }

  if (err.name === "CastError") {
    statusCode = BAD_REQUEST_ERROR_CODE;
  }

  res.status(statusCode).send({
    message:
      statusCode === SERVER_ERROR_CODE
        ? "An error occurred on the server"
        : err.message,
  });
};

module.exports = errorHandler;
