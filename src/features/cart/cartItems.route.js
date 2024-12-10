import express from "express";
import cartController from "./cartItems.controller.js";


const cartRoute=express.Router();

const cartcontroller=new cartController();

cartRoute.post("/",cartcontroller.add);
cartRoute.get("/",cartcontroller.get);
cartRoute.delete("/:id",cartcontroller.delete);

export default cartRoute;