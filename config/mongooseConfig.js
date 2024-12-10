import mongoose from "mongoose";
import { categorySchema } from "../src/features/product/category.schema.js";

export const connectMongoose=async()=>{
    try{
        mongoose.connect(process.env.DB_URL);
        console.log("MongoDb is connected using Mongoose");
        addCategories();
    }
    catch(err){
        console.log(err);
    }
}

async function addCategories(){
    const categoryModel= mongoose.model("categories",categorySchema);
    const categories=await categoryModel.find();
    if(!categories || categories.length==0){
        await categoryModel.insertMany([{name:"books"},{name:"clothing"},{name:"electronics"}]);
    }
    console.log("Categories added");

}