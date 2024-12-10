
import path from "path";
import multer from "multer";
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,path.join(path.resolve(),"public","upload"));

    },
    filename:(req,file,cb)=>{
        const name=Date.now() + "-"+ file.originalname;
        cb(null,name);

    }
})
export const uploadFile=multer({
    storage:storage,
})