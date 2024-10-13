const jwt = require("jsonwebtoken");

async function validateUser(req, res, next) {
  const secret = process.env.JWT_SECRET;
  if (!req.headers.authorization) {
    return res.status(401).send({
      message: "You are Unauthorized",
    });
  } else {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "You are Unauthorized" });
    } else {
      jwt.verify(token, secret, (err, decoded) => {
        if (err) {
          return res.status(401).send({
            message: "You are Unauthorized! Please login again",
          });
        } else {
          req.userInfo = decoded;
          next();
        }
      });
    }
  }
}
module.exports = validateUser;
