import { ApiError } from "../utils/ApiError.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { foodItemsModals } from "../modals/FoodItemsModal.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const foodItems = AsyncHandler(async (req, res) => {
    try {
        const response = await foodItemsModals.find();

        return res.json(ApiResponse(200, response, "Successfully fetched"))
    } catch (error) {
        return res.status(500).json({
            error: error.message
        });

    }
});

export const addFoodItem = AsyncHandler(async (req, res) => {
    try {
        const { name, description, price, margin } = req.body;

        if (name === "" || description === "" || price === "" || margin === "") {
            throw ApiError(404, "Name or description or price is missing")
        };
        const priceAfterMargin = parseInt(price)-((parseInt(margin) / 100) * parseInt(price))

        const addItem = await foodItemsModals.create({
            name: name,
            description: description,
            price: price,
            price_after_margin:  priceAfterMargin,
            margin:margin
        });

        return res.json(ApiResponse(200, addItem, "Item Successfully Added"))


    } catch (error) {
        return res.status(500).json({
            error: error.message
        });

    }

});

export const updateFoodItem = AsyncHandler(async (req, res) => {
    try {
        const { id, name, price, description, margin } = req.body;

        const itemExist = await foodItemsModals.findById(id);
        if (!itemExist) {
            throw ApiError(401, "Item with this id does not exist")
        };
        const priceAfterMargin = Number(price)-((Number(margin) / 100) * Number(price));
      
        await foodItemsModals.findOneAndUpdate(
            { _id: id },

            {
                $set: {
                    name: name,
                    price: price,
                    description: description,
                    margin:margin,
                    price_after_margin:  priceAfterMargin.toFixed(2),
                }
            });
        return res.status(201).json(
            ApiResponse(200, { id, name, price, description, margin}, "Item Successfully updated")
        )
    } catch (error) {
        return res.status(400).json(ApiError(400, `Some error in updating item: ${error}`))
    }

});

export const deleteItem = AsyncHandler(async (req, res) => {
  
    try {
        const { id } = req.params;
        const itemExist = await foodItemsModals.findById(id)
        if (!itemExist) {
            throw ApiError(401, "Item with this id does not exist")
        };

        await foodItemsModals.findByIdAndDelete(
            { _id: id }
        )
        return res.status(200).json(
            ApiResponse(200, `item with this ${id} successfully deleted`)
        )
    } catch (error) {
        return res.status(500).json(
            ApiError(500, "Some Issues while deleting the Item")
        )
    }
});