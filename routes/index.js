const router = require("express").Router();

const clothingItemsRouter = require("../models/clothingItems");
const userRouter = require("./users");

router.use("/users", userRouter);

router.use("/clothingItems", clothingItemsRouter);

module.exports = router;
