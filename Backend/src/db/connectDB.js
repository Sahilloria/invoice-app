import mongoose from "mongoose";
import { db_Name } from "../constants.js";

export const connectDB=async () =>{
    try {
      const res=   await mongoose.connect(`${process.env.MONGO_DB_URL}/${db_Name}`)
        console.log(res.connection)
    } catch (error) {
        console.log("Failed to connect DB",error)
    }
};