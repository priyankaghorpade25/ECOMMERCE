import dotenv from "dotenv";
dotenv.config();

import express from "express";
import path from"path";
import productRoute from "./src/features/product/product.route.js";
import  Userroute  from "./src/features/user/user.route.js";
import { Orderroute } from "./src/features/order/order.route.js";
import bodyParser from "body-parser";
import basicAuth from "./src/middleware/basicAuth.middleware.js";
import UserController from "./src/features/user/user.controller.js";
import jwtAuth from "./src/middleware/jwt.middleware.js";
import cartRoute from "./src/features/cart/cartItems.route.js";
import swagger from 'swagger-ui-express';
import apiDocs from './swagger.json' assert {type:'json'};
import cors from "cors";
import loggerMiddleware from "./src/middleware/logger.middleware.js";
import { ApplicationError } from "./src/errorhandler/applicationError.js";

import {MongoDbConnect} from "./config/mongodb.js";
import { connectMongoose } from "./config/mongooseConfig.js"; 
import { likeRoute } from "./src/features/likes/likes.route.js";





const server=express();

server.use(bodyParser.json());
server.use(loggerMiddleware);
server.use(
    '/api-docs',
    swagger.serve,
    swagger.setup(apiDocs)
)
const corOptions={
    origin:"http://localhost:5500"
}
server.use(cors(corOptions));




server.use("/api/products",jwtAuth,productRoute);
server.use("/api/users",Userroute);
server.use("/api/cart",jwtAuth,cartRoute);
server.use("/api/order",jwtAuth,Orderroute);
server.use("/api/like",jwtAuth,likeRoute);


server.get('/',(req,res)=>{
    res.send("Welcome to E-commerce Website");
})
server.use((req, res)=>{
    res.status(404).send("API not found. Please check our documentation for more information at localhost:3000/api-docs")
})
    

server.use((err,req,res,next)=>{
    console.log(err);
    if(err instanceof ApplicationError);
    res.status(err.code).send(err.message);
    res.status(500).send("Something went wrong .Please try again")
})

server.listen("3000",()=>{
    console.log("Server is listening on port 3000");
    //MongoDbConnect();
    connectMongoose();
})