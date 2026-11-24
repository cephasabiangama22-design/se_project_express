const router = require("express").Router();
const { getCurrentUser, update } = require("../controllers/users");
const { validateUpdateUser } = require("../middlewares/validation");

router.get("/me", getCurrentUser);

router.patch("/me", validateUpdateUser, update);

module.exports = router;
