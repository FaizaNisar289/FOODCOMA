import mongoose from "mongoose";

const foodSchema = mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true }, // Path to the uploaded image
}, { timestamps: true });

const Food = mongoose.model("Food", foodSchema);

export default Food;