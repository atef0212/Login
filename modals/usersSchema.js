import { Schema, model } from "mongoose";

const LoginSchema= new Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})
const collection=  model("users", LoginSchema)
export default collection