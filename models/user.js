import mongoose from "mongoose";
import crypto from "crypto";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  salt: String,
});

// Method to set hash the password for a user
userSchema.methods.hashedPassword = function (password) {

  if (password === this.password) { // same password
    return;
  }

  this.salt = crypto.randomBytes(16).toString("hex");
  this.password = crypto.pbkdf2Sync(password, this.salt, 1000, 64, "sha512").toString("hex");
};

userSchema.methods.validPassword = function (password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, "sha512").toString("hex");
  return this.password === hash;
};

export default mongoose.model("User", userSchema);
