import mongoose from "mongoose";
import { userSchema } from "./user.schema.js";

const userModel=mongoose.model("users",userSchema);

export default class UserRepository{
    
    static async signUp(newUser){
        try{
            const user=new userModel(newUser);
            await user.save();
            return user;


        }
        catch(err){
            console.log(err);
            
        }

    }
    static async findByEmail(email){
        try{
            return await userModel.findOne({email});


        }
        catch(err){
            console.log(err);
        }

    }

    static async resetPass(userId,hashPassword){
        try{
            let user=await userModel.findById(userId);
            console.log(user);
            if(user){
                user.password=hashPassword;
                user.save();
                console.log("Successfull");
            }
            else{
                throw new Error("User Not found");
            }

        }
        catch(err){
            console.log(err);

        }

    }



}
