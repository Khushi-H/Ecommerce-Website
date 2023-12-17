import express from "express";
import dotenv from "dotenv";
import colors from "colors"
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoute from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cors from "cors";
import path from "path";
import {fileURLToPath} from 'url'
// configure env
dotenv.config();

// dataabase config
connectDB();

// esmodule fix
const __filename = fileURLToPath(import.meta.url)

// rest object
const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "./client/public")));

// routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

// rest api
app.use("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/public/index.html"));
});

// port
const PORT = process.env.PORT || 5000;

// run listen
app.listen(PORT, () => {
  console.log(
    `server is running on ${process.env.DEV_MODE} on mode on ${PORT}`.bgCyan
      .white
  );
});
