
import ProductController from "./product.controller.js";
import express from "express";
import { uploadFile } from "../../middleware/fileUpload.middleware.js";


const productRoute=express.Router();
const productController=new ProductController();


productRoute.get("/filterProduct",productController.filterProduct);
productRoute.get("/average",productController.averagePrice);
productRoute.get("/:id",productController.getOneProduct);
productRoute.get("/",productController.getProduct);
productRoute.post("/",uploadFile.single("imageUrl"),productController.addProduct);

productRoute.post("/rate",productController.rateProduct);


export default productRoute;