const jwt = require("jsonwebtoken");
//const blacklist = new Set();

async function blackListToken(req, res) {
  req.blacklist.add(req.headers.authorization.split(" ")[1]);
  setTimeout(() => {
    req.blacklist.delete(req.headers.authorization.split(" ")[1]);
  }, 1000 * 60 * 60);
  return res.status(200).send({ message: "User logged out successfully" });
}

module.exports = blackListToken;