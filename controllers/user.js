import User from "../models/user.js";

export const register = (req, res, next) => {
  const { name, email, password, gender, dob, photo } = req.body;

  const validReq = () => {
    if (!name) return false;
    if (!email) return false;
    if (!password) return false;
    if (!gender) return false;
    if (!dob) return false;
    if (!photo) return false;
    return true;
  };

  if (!validReq) return res.status(400).send("One or more fields missing");

  const user = new User({
    name,
    email,
    password,
    gender,
    dob,
    photo,
  });

  user.hashedPassword(password)

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

export const getUsers = (req, res, next) => {};

export const updateUser = (req, res, next) => {};
