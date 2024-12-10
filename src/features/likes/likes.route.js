import express from "express";
import likeController from "./likes.controller.js";

const likecontroller=new likeController();
export const likeRoute=express.Router();

likeRoute.post("/",likecontroller.like);

