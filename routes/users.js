const router = require("express").Router();
const { getCurrentUser, update } = require("../controllers/users");
const { validateUser } = require("../middlewares/validation");

router.get("/me", getCurrentUser);

router.patch("/me", validateUser, update);

module.exports = router;
