import crypto from "crypto";
import dotenv from "dotenv";
import { Payment } from "../models/PaymentModel.js";
import { instance } from "../server.js";

// Load environment variables
dotenv.config();

export const checkout = async (req, res) => {
  try {
    const options = {
      amount: Number(req.body.amount * 100),
      currency: "INR",
    };
    const order = await instance.orders.create(options);

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Error in checkout:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const paymentVerification = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const secretKey = process.env.RAZORPAY_API_SECRET;
    if (!secretKey) {
      console.error("RAZORPAY_API_SECRET environment variable is not set.");
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }

    const expectedSignature = crypto
      .createHmac("sha256", secretKey)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // Database operations here
      await Payment.create({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      });

      res.redirect(
        `http://localhost:5173/paymentsuccess?status=success&reference=${razorpay_payment_id}`
      );
    } else {
      res.status(400).json({
        success: false,
        message: "Invalid Signature",
      });
    }
  } catch (error) {
    console.error("Error in payment verification:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
