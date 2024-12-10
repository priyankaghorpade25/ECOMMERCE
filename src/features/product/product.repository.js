import { ObjectId } from "mongodb";
import { getDB } from "../../../config/mongodb.js";
import { ApplicationError } from "../../errorhandler/applicationError.js";
import { ProductSchema } from "./product.schema.js";
import { reviewSchema } from "./review.schema.js";
import UserModel from "../user/user.model.js";
import mongoose from "mongoose";
import { categorySchema } from "./category.schema.js";

const productModel = new mongoose.model("products", ProductSchema);
const reviewModel = new mongoose.model("review", reviewSchema);
const categoryModel = new mongoose.model("category", categorySchema);
export default class productRepository {
  //add

  static async add(newProduct) {
    try {
      // const db = await getDB();
      // const collection = await db.collection("products");
      // const id = await this.getNextCount(db);
      // console.log(id);
      // newProduct.id = id;
      // await collection.insertOne(newProduct);
      // return newProduct;

      
      // Split category into an array and validate
    newProduct.categories = newProduct.category ? newProduct.category.split(",") : [];
    const product = new productModel(newProduct);
    const savedProduct = await product.save();

    // Update related categories
    if (newProduct.categories.length) {
      await categoryModel.updateMany(
        { _id: { $in: newProduct.categories } },
        { $push: { products: savedProduct._id } }
      );
    }

    return savedProduct;
      } catch (err) {
      throw new ApplicationError("Something went wrong", 400);
    }
  }

  //getall
  static async getAll() {
    try {
      const db = await getDB();
      const collection = await db.collection("products");
      const products = await collection.find().toArray();
      return products;
    } catch (err) {
      next(err);
    }
  }

  //getone

  static async getById(id) {
    try {
      console.log(id);
      console.log("inside getbyid repo");
      const db = getDB();
      const collection = db.collection("products");
      console.log("before id");
      console.log(id);
      const prod = await collection.findOne({ _id: new ObjectId(id) });

      console.log("after id");
      console.log(prod);
      return prod;
    } catch (err) {
      throw new ApplicationError("Something went wrong", 400);
    }
  }

  static async filter(minPrice, maxPrice, category) {
    try {
      console.log("inside filter repo");
      const db = await getDB();
      const collection = await db.collection("products");
      let filterExpression = {};
      console.log("before minprice");
      // if(minPrice){
      //     filterExpression.price={$gte:parseFloat(minPrice)}
      // }
      // //  if(maxPrice){
      // //     filterExpression.price={...filterExpression.price,$lte:parseFloat(maxPrice)}

      // // }
      if (minPrice || maxPrice) {
        filterExpression.price = {};
        if (minPrice) filterExpression.price.$gte = parseFloat(minPrice);
        if (maxPrice) filterExpression.price.$lte = parseFloat(maxPrice);
      }
      if (category) {
        filterExpression = { ...filterExpression, category };
        console.log("afterminprice");
      }

      console.log(filterExpression);
      // console.log(filterExpression);

      return await collection
        .find(filterExpression)
        .project({ name: 1, price: 1, category: 1 })
        .toArray();
    } catch (err) {
      throw new ApplicationError("something wrong", 400);
    }
  }

  static async rate(userId, productId, rating) {
    try {
      const productToRate = await productModel.findOne({ _id: productId });
      if (!productToRate) {
        throw new Error("product not found");
      }

      //find existing rating
      const userReview = await reviewModel.findOne({
        productID: productId,
        userID: userId,
      });
      if (userReview) {
        userReview.rating = rating;
        await userReview.save();
      } else {
        const newReview = new reviewModel({
          productID: productId,
          userID: userId,
          rating,
        });
        await newReview.save();
      }

      //old code withiudt mongoose

      //     console.log("inside rate repo");
      //     const db=getDB();
      //     const collection=db.collection("products");
      //     console.log("before")

      //     await collection.updateOne(
      //         {_id:new ObjectId(productId)},
      //         {$pull:{rating:{userId:new ObjectId(userId)}}}
      // );

      //     await collection.updateOne({_id:new ObjectId(productId)},
      //     {$push:{ratings:{userId:new ObjectId(userId),rating}}});
    } catch (err) {
      throw new ApplicationError("Something went wrong", 400);
    }
  }

  static async getNextCount(db) {
    const result = await db
      .collection("Counter")
      .findOneAndUpdate(
        { _id: "products" },
        { $inc: { value: 1 } },
        { returnDocument: "after" }
      );
    return result.value;
  }

  static async averageProductPricePerCategory() {
    try {
      const db = await getDB();

      return await db
        .collection("products")
        .aggregate([
          {
            $unwind: "$ratings",
          },
          {
            $group: {
              _id: "$name",
              averageRating: { $avg: "$ratings.rating" },
            },
          },
          // {
          //     $group:{
          //     _id:"$category",
          //     averagePrice:{$avg:"$price"}

          //     }
          // }
        ])
        .toArray();
    } catch {
      throw new ApplicationError("Something went wrong", 500);
    }
  }
}
