import mongoose from 'mongoose';

import User from "../models/user.js";
import { validReq } from "../helpers/userReqValidation.js";

export const register = (req, res, next) => {
  const { name, email, password, gender, dob, photo } = req.body;

  if (!validReq) return res.status(400).send("One or more fields missing");

  const user = new User({
    name,
    email,
    password,
    gender,
    dob,
    photo,
  });

  user.hashedPassword(password);

  // check if user already exists
  User.findOne({ email }, (err, data) => {
    if (data) {
      return res.status(409).send({ message: "User already exists!" });
    }

    user
      .save()
      .then((_) => {
        res.json({ message: "User Created Successfully" });
      })
      .catch((err) => res.status(500).send(err));
  });
};

export const login = (req, res, next) => {
  const { email, password } = req.body;

  const validReq = () => {
    if (!email) return false;
    if (!password) return false;
    return true;
  };
  if (!validReq) return res.status(400).send("One or more fields missing");

  User.findOne({ email }, function (err, user) {
    if (!user) {
      return res.status(404).send({ message: "Incorrect credentials" });
    }
    if (!user.validPassword(password)) {
      return res.status(400).send({ message: "Incorrect credentials" });
    }
    return res.status(201).send({ message: "Successfully authenticated" });
  });
};

export const getPeople = (req, res, next) => {
  const { userId } = req.params;

  User.find({}, (err, users) => {
    if (users) {
      const people = users.filter((user) => user._id.toString() !== userId);
      return res.status(200).send(people);
    }
    return res.status(200).send([]);
  });
};

export const updateUser = (req, res, next) => {
  const { userId } = req.params;
  const id = mongoose.Types.ObjectId(userId);
  const { name, email, password, gender, dob, photo } = req.body;

  if (!validReq) return res.status(400).send("One or more fields missing");

  const updatedUser = new User({
    _id: id,
    name,
    email,
    password,
    gender,
    dob,
    photo,
  });

  updatedUser.hashedPassword(password);

  User.findOneAndUpdate({ _id: id }, updatedUser, (err, result) => {
    if (err) {
        console.log(err);
      return res
        .status(500)
        .send({ messege: "Failed to update the user data." });
    }
    if (!result) {
        return res
        .status(500)
        .send({ messege: "Failed to update the user data." });
    }
    return res
      .status(201)
      .send({ message: "User details updated successfully." });
  });
};
