// import cors from "cors";
// import { config } from "dotenv";
// import express from "express";
// import paymentRoute from "./routes/paymentRoutes.js";

// // Load environment variables from config.env file
// config({ path: "./config/config.env" });

// export const app = express();

// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Routes
// app.use("/api", paymentRoute);

// app.get("/api/getkey", (req, res) =>
//   res.status(200).json({ key: process.env.RAZORPAY_API_KEY })
// );

import cors from "cors";
import { config } from "dotenv";
import express from "express";
import paymentRoute from "./routes/paymentRoutes.js";

// Load environment variables from config.env file
config({ path: "./config/config.env" });

export const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api", paymentRoute);

app.get("/api/getkey", (req, res) =>
  res.status(200).json({ key: process.env.RAZORPAY_API_KEY })
);
