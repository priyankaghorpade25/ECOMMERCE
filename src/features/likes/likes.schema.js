import mongoose from "mongoose";
export const likeSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
    likeable:{
        type:mongoose.Schema.Types.ObjectId,
        refPath:"types"

    },
    types:{
        type:String,
        enum:["products","category"]
    }
})