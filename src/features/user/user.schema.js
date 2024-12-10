import mongoose from "mongoose";

export const userSchema=new mongoose.Schema({
    name:String,
    email:{type:String,unique:true,required:true,
        match:[/.+\@.+\../,"Please enter valid email"]
    },
    password:{type:String,
        validate:{
            validator:function(value){
                return /^(?=.[@$!%?&])[A-Za-z\d@$!%=?&]{8,12}$/,test(value);
            },
            message:"Password should be between 8 to 12"
        }

    },
    type:{type:String,enum:["seller","Customer"]}

})
