import express from"express";
import UserController from "./user.controller.js";
import jwtAuth from "../../middleware/jwt.middleware.js";

const usercontroller = new UserController();


const Userroute=express.Router();

Userroute.post("/signup",usercontroller.signUp);
Userroute.post("/signin",usercontroller.signIn);
Userroute.get("/",usercontroller.get);
Userroute.put("/resetpassword",jwtAuth,usercontroller.resetPassword);

export default Userroute;

