const mongoose = require("mongoose");
//installation=> npm install --save mongoose-unique-validator
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});
userSchema.plugin(uniqueValidator);
module.exports = mongoose.model("User", userSchema);