const express = require("express");
const cors = require("cors");
const errorHandler = require("./middlewares/errorHandler");
const { errors } = require("celebrate");
require("dotenv").config();

const { PORT = 3001 } = process.env;
const app = express();
const mongoose = require("mongoose");

const mainRouter = require("./routes/index");

const { NOT_FOUND_ERROR_CODE } = require("./utils/errors");
const { requestLogger, errorLogger } = require("./middlewares/logger");

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(console.error);

app.use(express.json());

app.use(cors());

app.use("/", mainRouter);

app.use((req, res) => {
  res
    .status(NOT_FOUND_ERROR_CODE)
    .send({ message: "Requested resource not found" });
});

app.use(errors());

app.use(requestLogger);
// app.use(routes);

app.use(errorLogger);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
