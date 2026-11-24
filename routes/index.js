const router = require("express").Router();

const clothingItemsRouter = require("./clothingItems");
const userRouter = require("./users");
const { login, createUser } = require("../controllers/users");
const { getItems } = require("../controllers/clothingItems");
const auth = require("../middlewares/auth");
const { validateUser, authenticateUser } = require("../middlewares/validation");

router.post("/signin", authenticateUser, login);
router.post("/signup", validateUser, createUser);
router.get("/items", getItems);

router.use(auth);
router.use("/users", userRouter);
router.use("/items", clothingItemsRouter);

module.exports = router;
