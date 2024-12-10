import { getDB } from "../../../config/mongodb.js";
import { ApplicationError } from "../../errorhandler/applicationError.js";

export default class UserRepository{

    static async signUp(newuser){

        try{

            //get the database
            const db=await getDB();


            //get the collcetion
            const collection=db.collection("users");
        
            //insert the document
    
            await collection.insertOne(newuser);
            return newuser;
            

        }
        catch(err){
            throw new ApplicationError("something went wrong",500);
        }

        
    }

     static async findByEmail(email,password){
        try{
            console.log("Inside signin")

            const db=getDB();
            const collection=db.collection("users");
            console.log(collection)

            return await collection.findOne({email:email})

        }catch(err){
            throw new ApplicationError("User not found",404);
        }
        
    }


}