const jwt = require("jsonwebtoken");

//typically middleware node express which execute on upcoming request
module.exports = (req, res, next) => {
  // const token = req.query.auth
  try {
    console.log(req.headers.authorization);
    const token = req.headers.authorization.split(" ")[1];
    console.log(`Token is ${token}`);
    const decodedToken = jwt.verify(
      token,
      "secret_this_should_be_more_longer_sikrh"
    );
    req.userData = { email: decodedToken.email, userId: decodedToken.userId };
    next();
  } catch (error) {
    res.status(401).json({ message: "You are not authenticated!" });
  }
};
