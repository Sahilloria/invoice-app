import { Router } from "express";
import { foodItems, addFoodItem, updateFoodItem, deleteItem } from "../controllers/foodItems.routes.js";

export const routes = Router();

routes.route("/foodItems").get(foodItems);
routes.route("/newItem").post(addFoodItem);
routes.route("/updateItem").put(updateFoodItem);
routes.route("/deleteItem/:id").delete(deleteItem);