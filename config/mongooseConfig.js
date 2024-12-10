import mongoose from "mongoose";
import { categorySchema } from "../src/features/product/category.schema.js";

export const connectMongoose=async()=>{
    try{
        mongoose.connect(process.env.DB_URL,{
            
                useNewUrlParser: true,
                useUnifiedTopology: true,
                serverSelectionTimeoutMS: 30000,  // 30 seconds
                socketTimeoutMS: 45000,  // 45 seconds for socket timeout
                connectTimeoutMS: 10000,  // 10 seconds for connection timeout
              
        });
        console.log("MongoDb is connected using Mongoose");
        await addCategories();
        
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