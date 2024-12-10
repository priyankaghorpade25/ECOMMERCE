import { ObjectId } from "mongodb";
import { ApplicationError } from "../../errorhandler/applicationError.js";
import { getDB } from "../../../config/mongodb.js";
import OrderModel from "./order.model.js";

export default class OrderRepository{

    //placeorder


    static async placeorder(userId){
        const db=getDB();

        console.log("inside order repo");

        //get the cartitem and calculate total amount 
        const items= await this.getTotalamount(userId);
        const totalPriceAmount=items.reduce((sum,item)=>sum+=item.totalPrice,0);
        


        //create record
        const newOrder=new OrderModel(new ObjectId(userId),totalPriceAmount,new Date());
        await db.collection("orders").insertOne(newOrder);


        //reduce the stock
        for(let item of items){

            await db.collection("products").updateOne(
                {_id:item.productId},
                {$inc:{stock:-item.quantity}},
            )

        }

        //clear cart
        // await db.collection("Carts").deleteMany(
        //     {userId:new ObjectId(userId)},
        // )
        return ;
    }

    static async getTotalamount(userId){
        try{
            console.log("inside order repo")
            const db= getDB();
            console.log("after getting database");

            const items=await db.collection("Carts").aggregate([
                {
                    $match:{userId:new ObjectId(userId)}
                },
                {
                    $lookup:{
                        from:"products",
                        localField:"productId",
                        foreignField:"_id",
                        as:"ProductInfo"
                    }
                    
                },
                {
                    $unwind:"$ProductInfo"
                },
                {
                    $addFields:{
                        "totalPrice":{
                            $multiply:["$ProductInfo.price","$quantity"]

                    }
                }
                }]

            ).toArray();
            console.log(items);
            return items;

        }
        catch{
            throw new ApplicationError("Something went wrong",500);
        }

    }
}
