import Admin from "../models/Admin";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const addAdmin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email && email.trim() === "" && !password && password.trim() === "") {
    return res.status(400).json({ message: "invalid inputs" });
  }
  let existingAdmin;
  try {
    existingAdmin = await Admin.findOne({ email });
  } catch (err) {
    return next(err);
  }

  if (existingAdmin) {
    return res.status(500).json({ message: "Admin Already exisiting" });
  }
  const hashedPassword = bcrypt.hashSync(password);
  let admin;
  try {
    admin = new Admin({ email, password: hashedPassword });
    admin = await admin.save();
  } catch (err) {
    return next(err);
  }

  if (!admin) {
    return res.status(500).json({ message: "unable to store admin" });
  }
  return res.status(200).json({ admin });
};

export const loginAdmin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email && email.trim() === "" && !password && password.trim() === "") {
    return res.status(400).json({ message: "invalid inputs" });
  }
  let existingAdmin;
  try {
    existingAdmin = await Admin.findOne({ email });
  } catch (err) {
    return next(err);
  }

  if (!existingAdmin) {
    return res.status(500).json({ message: "Admin not found" });
  }
  const isCorrectPassowrd = bcrypt.compareSync(
    password,
    existingAdmin.password
  );
  if (!isCorrectPassowrd) {
    return res.status(500).json({ message: "Incorrect Password" });
  }
  const token = jwt.sign({ id: existingAdmin._id }, process.env.SECRET_KEY, {
    expiresIn: "7d",
  });
  return res
    .status(200)
    .json({ message: "Login sucessfully", token, id: existingAdmin._id });
};
export const getAllAdmins = async (req, res, next) => {
  let admins;
  try {
    admins = await Admin.find();
  } catch (err) {
    return next(err);
  }

  if (!admins) {
    return res.status(500).json({ message: "unexpected error ocured" });
  }
  return res.status(200).json({ admins });
};
