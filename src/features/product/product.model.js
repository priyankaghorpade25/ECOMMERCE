import { ApplicationError } from "../../errorhandler/applicationError.js";
import UserModel from "../user/user.model.js";
export default class ProductModel{

    constructor(name,desc,price,sizes,categories,imageUrl){
        //this.id=id;
        this.name=name;
        this.desc=desc;
        this.price=price;
        this.imageUrl=imageUrl;
        this.categories=categories;
        this.sizes=sizes;

    }

    

    

    
  

    //   static filter(minprice, maxprice) {
    //     // Filter products within the given price range
    //     console.log(products);
    //     const filteredProd = products.filter(prod => {
    //       return (prod.price >= minprice) && (prod.price <= maxprice)

    //     }
           
    //     );
    
        
    //     return filteredProd; // Return the array of filtered products
    // }
    // static rate(userId,productId,rating){
    //   const user=UserModel.getAll();
    //   user.find((us)=>us.id==userId);
    //   if(!user){
    //     throw new ApplicationError("user NOT found" ,404);
    //   }
    //   const product=products.find((prod)=>prod.id==productId);
    //   if(!product){
    //     throw new ApplicationError("Product not found",404);
    //   }
    //   if(!product.ratings){
    //     product.ratings=[];
    //     product.ratings.push({
    //       userId:userId,
    //       rating:rating,
    //     })

    //   }
    //   else{
    //     product.ratings.push({
    //       userId:userId,
    //       rating:rating,
    //     })

    //   }

    // }
    

     
}




var products = [
    new ProductModel(
      1,
      'Product 1',
      'Description for Product 1',
      19.99,
      'https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg',
      'Cateogory1',
      ['M', 'XL']
    ),
    new ProductModel(
      2,
      'Product 2',
      'Description for Product 2',
      29.99,
      'https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg',
      'Cateogory2',
      ['M', 'XL']
    ),
    new ProductModel(
      3,
      'Product 3',
      'Description for Product 3',
      39.99,
      'https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg',
      'Cateogory3',
      ['M', 'XL','S']
    )]