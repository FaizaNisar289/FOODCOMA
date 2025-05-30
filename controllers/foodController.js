import foodModel from "../models/foodModel.js";
import fs from "fs"; // Import the fs module

// Add Food Controller
export const addFood = async (req, res) => {
    try {
        const { name, price, description } = req.body;
        const image = req.file ? req.file.filename : null;

        if (!name || !price || !description || !image) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const food = new foodModel({ name, price, description, image });
        await food.save();

        res.status(201).json({ success: true, message: "Food item added successfully", food });
    } catch (error) {
        console.error("Error adding food item:", error.message);
        res.status(500).json({ success: false, message: "Error adding food item" });
    }
};

// Remove Food Controller
export const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);

        if (!food) {
            return res.status(404).json({ success: false, message: "Food item not found" });
        }

        // Delete the image file
        fs.unlink(`uploads/${food.image}`, () => {});

        // Delete the food item from the database
        await foodModel.findByIdAndDelete(req.body.id);

        res.status(200).json({ success: true, message: "Food item removed successfully" });
    } catch (error) {
        console.error("Error removing food item:", error.message);
        res.status(500).json({ success: false, message: "Error removing food item" });
    }
};

// List Food Controller
export const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find();
        res.status(200).json({ success: true, foods });
    } catch (error) {
        console.error("Error fetching food items:", error.message);
        res.status(500).json({ success: false, message: "Error fetching food items" });
    }
};