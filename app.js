const express = require("express");

const { PORT = 3001 } = process.env;
const app = express();
const mongoose = require("mongoose");

const mainRouter = require("./routes/index");

const { NOT_FOUND_ERROR_CODE } = require("./utils/errors");

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {})
  .catch(console.error);

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: "5d8b8592978f8bd833ca8133",
  };

  next();
});

app.use("/", mainRouter);

app.use((req, res) => {
  res
    .status(NOT_FOUND_ERROR_CODE)
    .send({ message: "Requested resource not found" });
});
app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
