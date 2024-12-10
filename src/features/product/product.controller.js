import UserModel from "../user/user.model.js";
import ProductModel from "./product.model.js";
import productModel from "./product.model.js";
import productRepository from "./product.repository.js";

export default class ProductController{
    async getProduct(req,res,next){
        try{
            const product= await productRepository.getAll();
            return  res.status(200).send(product);
           
        }
        catch(err){
            next(err)
        }

    }

    // addProduct(req,res){
    //     console.log(req.file);
    //     console.log(req.body);
        
    //     // if (!req.file) {
    //     //     return res.status(400).json({ error: 'File not uploaded' });
    //     // }
    //      console.log(req.file.filename)

    //     const{name,desc,price,category,sizes}=req.body;
    //     const prod={
    //         name,
    //         desc,
    //         price:parseFloat(price),
    //         imageUrl:"/upload/"+req.file.filename,
    //         sizes:sizes.split(","),
    //         category,
    //     }

    //     const createProduct=productModel.add(prod);

    //     res.status(200).send("All data posted");

    // }


    async addProduct(req,res,next){

        try{
        // console.log(req.body);
        // console.log(req.file.filename);
        const {name, price, desc, categories,sizes,}=req.body;
        const product=new ProductModel( name,desc,parseFloat(price),sizes.split(','),categories,"/upload/"+req.file.filename,);
        const createdProduct=await productRepository.add(product);
        console.log(createdProduct)

        res.status(200).send(createdProduct);
        }
        catch(err){
            next(err)
        }
    }

        
    async getOneProduct(req,res,next){
       try{
        console.log("inside getone control")
        const id=req.params.id;console.log(id);
        const product=await productRepository.getById(id);
            if(!product){
                res.status(404).send("Product not found");
            }
            else{
                res.status(200).send(product)
            }
       


       }
       catch(err){
        next(err);
       }

    }
    
    async filterProduct(req,res,next){
            console.log("inside filter");
            try{
                console.log(req.query);
            const { minprice, maxPrice,category } = req.query;
            console.log("before")
            const filtered = await productRepository.filter(minprice,maxPrice, category);
            console.log("after");
            console.log(filtered);
            

            res.status(200).send(filtered); 

            }
            catch(err){
                next();
            }
        
    
    }

    async rateProduct(req,res,next){
        try{
            console.log("inside rate controller")
            const userId=req.userId;
            const productId=req.query.productId;
            const rating=req.query.rating;
            await productRepository.rate(userId,productId,parseFloat(rating));
            res.status(200).send("Rating added successfully.");

        }
        catch(err){
            next(err);

        }
    
        

    }
    async averagePrice(req,res,next){
        try{
            const averageprice=await productRepository.averageProductPricePerCategory();
            res.status(200).send(averageprice);

        }
        catch{
            next(err);
        }
    }

}