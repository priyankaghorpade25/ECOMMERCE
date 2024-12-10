import UserModel from "../features/user/user.model.js";
const basicAuth=(req,res,next)=>{

    const authHeader=req.headers["authorization"];
    console.log(req.headers);
    console.log(authHeader);
    if(!authHeader){
        res.send("Header details not found")
    }
    const base64creds=authHeader.replace('Basic',",");
    const decodeData=Buffer.from(base64creds,"base64").toString("utf-8");
    console.log(decodeData);
    const creds=decodeData.split(":");
    const user=UserModel.signIn(creds[0],creds[1]);
    if(user){
        next()
    }
    else{
        res.send("Invalid creds")
    }
    

}
export default basicAuth;