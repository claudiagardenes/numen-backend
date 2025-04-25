import mongoose from "mongoose";
import { config } from "../config";

export const connectDB = async () =>{
    try{
        await mongoose.connect(config.mongoURL);
        console.log("base de datos conectada")
    }catch(error){
        if(error instanceof Error){
        console.log("error al conectarse a la base de datos-" + error.message)
        }else{
            console.log("error al conectarse a la base de datos")
        }
    }
}