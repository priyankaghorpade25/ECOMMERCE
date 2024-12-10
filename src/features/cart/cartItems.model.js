export default class Cartmodel{
    constructor(productId,userId,quantity,id){
        this.productId=productId;
        this.userId=userId;
        this.quantity=quantity;
        this.id=id;
    }
    static get(userId){
        console.log("inside get model");
        return cartItems.filter((us)=>userId==us.id);
    }
    // static add(productId,userId,quantity,id){
    //     console.log("inside add model")
    //     const cartItem=new Cartmodel(productId,userId,quantity);
    //     cartItem.id=cartItems.length+1;
    //     cartItems.push(cartItem);
    //     console.log(cartItems);
        
    //     return cartItems;

    // }
    // static delete(userId,itemId){
    //     const index=cartItems.findIndex((item)=>item.id==itemId & item.userId==userId);
        
    //     if(index==-1){
    //         return "Item not found";

    //     }
    //     cartItems.splice(index,1);

    // }
    
}
var cartItems=[
    
    
];