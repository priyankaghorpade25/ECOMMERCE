import mongoose from "mongoose";

export const reviewSchema= mongoose.Schema({
    productID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"products"
    },
    userID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
    rating:Number
})