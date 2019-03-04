const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = new User({
      email: req.body.email,
      password: hash
    });
    user
      .save()
      .then(result => {
        res.status(201).json({
          message: "User created!",
          result: result
        });
      })
      .catch(err => {
        res.status(500).json({
          message: "Invalid authentication credentials!"
        });
      });
  });
};

exports.userLogin = (req, res, next) => {
  let fetchUser;
  User.findOne({ email: req.body.email })
    .then(user => {
      console.log(user);
      if (!user) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      fetchUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      console.log(result);
      if (!result) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      //creating jwt token
      const token = jwt.sign(
        { email: fetchUser.email, userId: fetchUser._id },
        process.env.JWT_KEY,
        { expiresIn: "1h" } //1hour
      );
      console.log(token);
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        userId: fetchUser._id
      });
    })
    .catch(err => {
      console.log(err);
      return res.status(401).json({
        message: "Invalid authentication credentials!"
      });
      //throw new Error("Something went wrong");
    });
};
