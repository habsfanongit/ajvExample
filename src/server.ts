import express, {Express,Request, Response} from "express"
import Ajv, { AnySchema } from "ajv";
import addFormats from "ajv-formats";
import Post from "./interfaces/Post";
import { readFileSync } from "fs";
import {validator} from "./schemavalidator"

const schemaFile =  readFileSync("./schemas/posts.json", "utf-8");
const app:Express = express();
app.use(express.json());
app.post("/validate",(req:Request, res:Response)=>{
    const schemaObject =JSON.parse(schemaFile)
    const ajv = new Ajv({ allErrors: true});
   
    addFormats(ajv);
    
    const isValid = ajv.compile<Post>(schemaObject);
    if(isValid(req.body)){
        console.log("Valid");
        
    }
    else{
        console.log(isValid.errors);
       
    }
    res.end();
});
app.post("/validate2",(req:Request, res:Response)=>{
    

   if(validator(req.body)){
console.log("IS VALID");
   }
   else{
    console.log(validator.errors)
   }
    res.end();
});
app.listen(3000, ()=>{
    console.log('running on port 3000');
})