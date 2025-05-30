import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js"; 
 // renamed to userRouter
import cartRouter from "./routes/cartRoute.js";
import orderRouter from './routes/orderRoutes.js';


import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

console.log("Starting server...");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

console.log("Connecting to MongoDB...")
connectDB()

console.log("Setting up API endpoints...")
app.use("/api/food", foodRouter)
app.use("/api/user", userRouter)
 // enable /api/user/login and /api/user/register
app.use("/api/cart", cartRouter)
app.use("/api/order",orderRouter)


app.use("/images", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("API is working");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
