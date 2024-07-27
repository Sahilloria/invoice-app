import mongoose from "mongoose";
import { db_Name } from "../constants.js";

export const connectDB=async () =>{
    try {
        await mongoose.connect(`${process.env.MONGO_DB_URL}/${db_Name}`)
        // console.log(res.connection.host)
    } catch (error) {
        console.log("Failed to connect DB",error)
    }
};