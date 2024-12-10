import mongoose from "mongoose";
import { likeSchema } from "./likes.schema.js";

const likeModel= new mongoose.model("like",likeSchema);

export class likeRepository{

    static async likeProduct(userId,Id,type){

        const likeProduct=new likeModel({userId:userId,likeable:Id,type:"products"});
        const savedProduct= await likeProduct.save();
        return savedProduct;

    }
    static async likeCategory(userId,id,type){
        const likeCategory= new likeModel({userId:userId,likeable:id,type:"category"});
        const savedCategory=await likeCategory.save();
        return savedCategory;

    }


}