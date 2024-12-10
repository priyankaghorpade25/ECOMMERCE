import OrderConroller from "./order.controller.js";
import express from "express";

export const Orderroute=express.Router();

const orderController= new OrderConroller();

Orderroute.get("/",orderController.PlaceOrder);