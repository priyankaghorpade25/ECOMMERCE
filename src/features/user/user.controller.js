
import UserModel from "./user.model.js";
import jwt from "jsonwebtoken";
import UserRepository from "./user.repository.js";
import bcrypt from "bcrypt";


export default class UserController{

    async resetPassword(req,res,next){
        try{
            const {newPassword}=req.body;
            const userId=req.userId;
            console.log(userId);

            const hashPassword= await bcrypt.hash(newPassword,12);
            console.log(hashPassword);
            await UserRepository.resetPass(userId,hashPassword);
            res.status(200).send("Password is updated");

        }
        catch(err){
            next(err);

        }
    }
    async signUp(req,res,next){
        try{
            const {name,email,password,type}=req.body;
        const hashPassword= await bcrypt.hash(password,12)//10-20 sec
        console.log(hashPassword);
        const newuser=new UserModel(name,email,hashPassword,type)
        await UserRepository.signUp(newuser);
        
        res.status(200).send(newuser);
        }
        catch(err){
            next(err);
        }
        


    }
    async signIn(req,res,next){
        try{
        console.log("inside signin controller")

        const{email,password}=req.body;
        console.log(email);
        const user=await UserRepository.findByEmail(email);
        
       // console.log(result.id);
        if(!user){
            return res.status(404).send("invalid creds");
        }
        else{
           
            const result=bcrypt.compare(password,user.password);
            if(result){
            const token=jwt.sign({
                userId:user._id,
               
                email:email,
            },
            process.env.JWT_SECRET,
            {
                expiresIn:"10d"
            }

        );
        console.log(token);
        return res.status(200).send(token); }
        
        else{
            res.status(404).send("invalid creds");

        }
        


        }

        }
        catch(err){
            next(err);
        }
        

    }
    get(req,res){
        const result =UserModel.getAll();
        console.log("inside get user")
        res.status(200).send(result);

    }
    

}