import Ajv from "ajv";
import { readFileSync } from "fs";
import addFormats from "ajv-formats";

const schemaFile =  readFileSync("./schemas/posts.json", "utf-8");
const schemaObject =JSON.parse(schemaFile);

const ajv = new Ajv({ allErrors: true});
addFormats(ajv);
ajv.addSchema(schemaObject);
const validator = ajv.getSchema("ratechange")
|| ajv.compile(schemaObject);
export {validator}