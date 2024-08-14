import mongoose, { Schema } from "mongoose";

const foodItemsSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        price: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        margin:{
            type:String,
            required:true
        },
        price_after_margin:{
            type:String,
            required:true
        }
    },
    { timestamps: true }
);

export const foodItemsModals = mongoose.model("foodItems", foodItemsSchema);

