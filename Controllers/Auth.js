const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const headerToken = req.body.Authorization.split(" ")[1];
  if (!headerToken) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(headerToken,'secretKey');
    req.user = decoded;
  } catch (err) {
    return res.status(401)
    
  }
  return next();
};

module.exports = verifyToken;