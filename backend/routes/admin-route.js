import express from "express";
import {
  addAdmin,
  getAllAdmins,
  loginAdmin,
} from "../controller/admin-controller";

const adminRoute = express.Router();

adminRoute.post("/signUp", addAdmin);
adminRoute.post("/login", loginAdmin);
adminRoute.get("/", getAllAdmins);

export default adminRoute;
