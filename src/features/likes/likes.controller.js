import mongoose from "mongoose";
import { likeRepository } from "./likes.repository.js";



export default class likeController{

    async like(req,res,next){
        try{
            const {id,type}=req.body;
            if(type=="products"){
                await likeRepository.likeProduct(req.userId,id,type);

            }
            if(type=="category"){
                await likeRepository.likeCategory(req.userId,id,type);
            }
            return res.status(201).send("Likes updated successfully");
        }
        catch(err){
            next(err);
        }
    }

}