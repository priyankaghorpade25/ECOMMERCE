import { ObjectId } from "mongodb";
import { getDB } from "../../../config/mongodb.js";
import { ApplicationError } from "../../errorhandler/applicationError.js";
export class CartRepository{


    static async add(productId,userId,quantity){
        try{
            const db=await getDB();
            const collection= await db.collection("Carts");
            const id=await this.getNextCount(db);
            console.log(id);

            //await collection.insertOne({productId:new ObjectId(productId),userId:new ObjectId(userId),});
            //will use upsert here if it is already present in cart the  update quantity else add into cart

            await collection.updateOne({userId:new ObjectId(userId),productId:new ObjectId(productId)},
        
            {   $setOnInsert:{_id:id},
                $inc:{quantity:quantity}},
            {upsert:true})

        }
        catch{
            throw new ApplicationError("Something Went Wrong",500);
        
        }
        

    }

    static async get(userId){
        try{
            const db=await getDB();

            const collection=await db.collection("Carts");

            return await collection.find({userId:new ObjectId(userId)}).toArray();




        }
        catch{
            throw new ApplicationError("Something went wrong",500);

        }
    }

    static async delete(userId,cartItemId){
        try{
            const db= await getDB();
            const collection=await db.collection("Carts");
            const result = await collection.deleteOne({userId:new ObjectId(userId),_id:new ObjectId(cartItemId)})
            return result.deletedCount>0;
        }
        catch{
            throw new ApplicationError("Something went wrong",500);

        }

    }

    static async getNextCount(db){
       const result= await db.collection("Counter").findOneAndUpdate({_id:"Carts"},
        {$inc:{value:1}},
        {returnDocument:'after'}
       );
       return result.value;


    }

}