import OrderRepository from "./order.repository.js";

export default class OrderConroller{

    async PlaceOrder(req,res,next){
        try{
            console.log("inside order controller")
            const userId=req.userId;
            console.log(userId);
            await OrderRepository.placeorder(userId);
            //console.log(data);
            res.status(200).send("user is created");

        }
        catch(err){
            next(err);
        }
    }

}