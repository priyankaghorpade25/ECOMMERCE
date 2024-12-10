import {MongoClient} from "mongodb";

const url="mongodb://localhost:27017/EcomDb";
let clientDb;
console.log("Connect");


export const MongoDbConnect=()=>{
    try{
        MongoClient.connect(process.env.DB_URL)
        .then((client)=>{


        clientDb=client.db();
        creteCounter(clientDb);
        createIndex(clientDb);
        console.log(clientDb);
        console.log("Mongodb is connected");
        console.log("testes");
        
    })
    }
    catch(err){
        console.log(err);
    }
    
}
export const getDB=()=>{
    return clientDb;
}

const creteCounter=async(db)=>{
    const existingCounter=await db.collection("Counter").findOne({_id:'Carts'});
    if(!existingCounter){
        await db.collection("Counter").insertOne({_id:'Carts',value:0});
    }

    const existingCounter1=await db.collection("Counter").findOne({_id:'products'});
    if(!existingCounter1){
        await db.collection("Counter").insertOne({_id:'products',value:0});
    }

    const existingCounter2=await db.collection("Counter").findOne({_id:'users'});
    if(!existingCounter2){
        await db.collection("Counter").insertOne({_id:'users',value:0});
    }
    
}

const createIndex = async(db)=>{
    try{

        await db.collection("products").createIndex({price:1});
        await db.collection("products").createIndex({name:1,category:-1});
        await db.collection("products").createIndex({desc:"text"});

    }
    catch(err){
        console.log(err);

    }
}