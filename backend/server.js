const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Load environment variables first
require("dotenv").config();

const paymentController = require("./controllers/PaymentController");
const app = express();

app.use(cors());
const uri = process.env.MONGOURI;

// Webhook endpoint needs raw body
app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  paymentController.handleWebhook
);

app.use(express.json());

// Payment routes
app.post("/create-payment-session", paymentController.createPaymentSession);
app.get("/order-status/:sessionId", paymentController.getOrderStatus);
app.get("/check-payment/:sessionId", paymentController.checkPaymentStatus);

const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err.message);
  }
};
connectDB();

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
