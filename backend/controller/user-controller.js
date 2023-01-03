import User from "../models/User";
import bcrypt from "bcryptjs";

export const getAllUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    return next(err);
  }

  if (!users) {
    return res.status(500).json({ message: "unexpected error ocured" });
  }
  return res.status(200).json({ users });
};

export const signUp = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (
    !name &&
    name.trim() === "" &&
    !email &&
    email.trim() === "" &&
    !password &&
    password.trim() === ""
  ) {
    return res.status(400).json({ message: "invalid inputs" });
  }
  const hashedPassword = bcrypt.hashSync(password);
  let user;
  try {
    user = new User({ name, email, password: hashedPassword });
    user = await user.save();
  } catch (err) {
    return next(err);
  }

  if (!user) {
    return res.status(500).json({ message: "unexpected error ocured" });
  }
  return res.status(200).json({ user });
};

export const updateUsers = async (req, res, next) => {
  const id = req.params.id;
  const { name, email, password } = req.body;
  if (
    !name &&
    name.trim() === "" &&
    !email &&
    email.trim() === "" &&
    !password &&
    password.trim() === ""
  ) {
    return res.status(400).json({ message: "invalid inputs" });
  }
  const hashedPassword = bcrypt.hashSync(password);

  let user;
  try {
    user = await User.findByIdAndUpdate(id, {
      name,
      email,
      password: hashedPassword,
    });
  } catch (err) {
    return next(err);
  }

  if (!user) {
    return res.status(500).json({ message: "somethimg went wrong" });
  }
  return res.status(200).json({ message: "Updated sucessfully" });
};

export const deleteUsers = async (req, res, next) => {
  const id = req.params.id;
  let user;
  try {
    user = await User.findByIdAndRemove(id);
  } catch (err) {
    return next(err);
  }

  if (!user) {
    return res.status(500).json({ message: "unexpected error ocured" });
  }
  return res.status(200).json({ message: "Deleted sucessfully" });
};

export const loginUsers = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email && email.trim() === "" && !password && password.trim() === "") {
    return res.status(400).json({ message: "invalid inputs" });
  }
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    return next(err);
  }

  if (!existingUser) {
    return res.status(500).json({ message: "Unable to find user" });
  }
  const isCorrectPassowrd = bcrypt.compareSync(password, existingUser.password);
  if (!isCorrectPassowrd) {
    return res.status(500).json({ message: "Incorrect Password" });
  }
  return res.status(200).json({ message: "Login sucessfully" });
};
