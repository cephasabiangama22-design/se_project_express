const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startwith("bearer")) {
    return res.status(401).send({ message: "authorization required" });
  }
  const token = authorization.replace("Bearer", "");

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return res.status(401).send({ message: "Autherization required" });
  }

  req.user = payload;

  return next();
};
