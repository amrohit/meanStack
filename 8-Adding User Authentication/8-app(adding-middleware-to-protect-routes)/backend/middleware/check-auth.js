const jwt = require("jsonwebtoken");

//typically middleware node express which execute on upcoming request
module.exports = (req, res, next) => {
  // const token = req.query.auth
  try {
    const token = req.headers.authorization.split("")[1];
    jwt.verify(token, "secret_this_should_be_more_longer_sikrh");
    next(); //let the execution continue
  } catch (error) {
    res.status(401).json({ message: "Auth failed!" });
  }
};
