// import Razorpay from "razorpay";
// import { app } from "./app.js";
// import { connectDB } from "./config/database.js";

// // Connect to MongoDB
// connectDB();

// // Initialize Razorpay instance
// export const instance = new Razorpay({
//   key_id: process.env.RAZORPAY_API_KEY,
//   key_secret: process.env.RAZORPAY_API_SECRET,
// });

// // Start the server
// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

import Razorpay from "razorpay";
import { app } from "./app.js";
import { connectDB } from "./config/database.js";

// Connect to MongoDB
connectDB();

// Initialize Razorpay instance
export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

// Verify Razorpay instance initialization
console.log("Razorpay Key ID:", process.env.RAZORPAY_API_KEY);
console.log("Razorpay Key Secret:", process.env.RAZORPAY_API_SECRET);

if (!instance) {
  console.error("Razorpay instance initialization failed.");
}

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
