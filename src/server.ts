import express, {Express,Request, Response} from "express"
import Ajv, { AnySchema } from "ajv";
import addFormats from "ajv-formats";
import Post from "./interfaces/Post";


import { readFileSync } from "fs";

const d =  readFileSync("./schemas/posts.json", "utf-8");
const app:Express = express();
app.use(express.json());
app.post("/validate",(req:Request, res:Response)=>{
    const b =JSON.parse(d)
    console.log(req.body);
   // console.log(postSchema);
    const ajv = new Ajv({ allErrors: true});
    addFormats(ajv);
    const isValid = ajv.compile<Post>(b);
    if(isValid(req.body.items)){
        console.log("Valid");
        
    }
    else{
        console.log(isValid.errors);
       
    }
    res.end();
});
app.listen(3000, ()=>{
    console.log('running on port 3000');
})