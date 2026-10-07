const router = require("express").Router();
const { getCurrentUser, update } = require("../controllers/users");

router.get("/me", getCurrentUser);

router.patch("/me", update);

module.exports = router;
