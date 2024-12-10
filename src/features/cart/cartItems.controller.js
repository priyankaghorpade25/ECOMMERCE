import Cartmodel from "./cartItems.model.js";
import {CartRepository} from "./cartItems.repository.js";
export default class cartController{
    
    async add(req,res,next){
        try{
            console.log("insdie cart  add controller");
            const userId=req.userId;
            console.log("USER",userId);
            
            const productId=req.query.productId;
            const quantity=req.query.quantity;

            //const cartObject= new Cartmodel(productId,userId,parseFloat(quantity));
            console.log("before passing arguments");
            const item=await CartRepository.add(productId,userId,parseFloat(quantity));
            console.log(item);
            res.status(200).send("Cart item added successfully ");

        }
        catch(err){
            next(err);
        }
       

    }
    async get(req,res,next){
        try{
            console.log("inside get cart controller ");
            const userId=req.userId;
            const result=await CartRepository.get(userId);
            console.log(result);
            res.status(200).send(result);
        }
        catch(err){
            next(err);
        }
        

    }
    async delete(req,res,next){
        try{
            console.log("iNSIDE DELETE CART");
            const userId=req.userId;
            const cartItemId=req.params.id;
            console.log("CartItem" ,cartItemId);
            const isDeleted=CartRepository.delete(userId,cartItemId);
            if(!isDeleted){
                res.status(400).send("Item Not Found");
            }
            else{
                res.status(400).send("Cart Item has deleted");
            }
    

        }
        catch(err){
            next(err);
        }
       

    }

}