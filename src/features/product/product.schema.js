import mongoose from "mongoose";

export const ProductSchema =new mongoose.Schema({
    name:String,
    price:Number,
    category:String,
    description:String,
    InStock:Number,
    categories:{
        type:mongoose.Schema.Types.Array,
        ref:"category"
    }
})