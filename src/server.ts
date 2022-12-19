import express, {Express,Request, Response} from "express"
import Ajv from "ajv";
import addFormats from "ajv-formats";
import Post from "./interfaces/Post";
import * as postSchema from "../schemas/posts.json" assert { type: "json" };
const app:Express = express();
app.use(express.json());
app.post("/validate",(req:Request, res:Response)=>{
    const ajv = new Ajv({ allErrors: true});
    addFormats(ajv);
    const isValid = ajv.compile<Post>(postSchema);
    if(isValid(req.body)){
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