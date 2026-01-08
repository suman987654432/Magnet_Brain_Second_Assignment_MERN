const Order = require("../models/order");

const createPaymentSession = async (req, res) => {
  try {
    console.log("Creating payment session...");
    console.log("Request body:", req.body);

    if (!process.env.STRIPE_SECRET_KEY) {
      console.error("STRIPE_SECRET_KEY not found");
      return res.status(500).json({ error: "Stripe configuration missing" });
    }

    const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
    const { items, email, amount } = req.body;

    if (!items || !email || !amount) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Validate items array
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "Invalid items array" });
    }

    // Create order with pending status
    const order = new Order({
      items,
      amount,
      status: "pending",
      email,
    });
    await order.save();

    // Create Stripe session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer_email: email,
      line_items: items.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
            description: `Quantity: ${item.quantity}`,
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: `https://magnet-brain-2ndassgnment.onrender.com/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `https://magnet-brain-2ndassgnment.onrender.com/failed`,
      metadata: {
        orderId: order._id.toString(),
        email: email,
      },
      billing_address_collection: "auto",
      locale: "en",
      expires_at: Math.floor(Date.now() / 1000) + 30 * 60,
    });

    // Update order with Stripe session ID
    order.stripeSessionId = session.id;
    await order.save();
    res.json({
      url: session.url,
      sessionId: session.id,
    });
  } catch (error) {
    console.error("Payment session error:", error);
    res.status(500).json({
      error: "Failed to create payment session",
      details: error.message,
    });
  }
};

//HANDLE WEBHOOK
const handleWebhook = async (req, res) => {
  console.log("Webhook received");
  console.log("Headers:", req.headers);
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
  let event;
  try {
    event = req.body;
  } catch (err) {
    console.log("Webhook signature verification failed.", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const orderId = session.metadata.orderId;
    try {
      const updatedOrder = await Order.findByIdAndUpdate(
        orderId,
        {
          status: "success",
          stripeSessionId: session.id,
        },
        { new: true }
      );
      console.log("Order updated to success:", updatedOrder);
    } catch (error) {
      console.error("Error updating order:", error);
    }
  } else if (
    event.type === "checkout.session.expired" ||
    event.type === "payment_intent.payment_failed"
  ) {
    const session = event.data.object;
    const orderId = session.metadata?.orderId;

    if (orderId) {
      console.log("Payment failed for order:", orderId);
      await Order.findByIdAndUpdate(orderId, {
        status: "failed",
      });
    }
  }

  res.json({ received: true });
};

//checkpaymentstatus
const checkPaymentStatus = async (req, res) => {
  try {
    const { sessionId } = req.params;

    const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    let order = await Order.findOne({ stripeSessionId: sessionId });
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Update order status
    if (session.payment_status === "paid" && order.status !== "success") {
      const updatedOrder = await Order.findByIdAndUpdate(
        order._id,
        { status: "success" },
        { new: true }
      );
      order = updatedOrder;
    } else if (session.status === "expired" && order.status !== "failed") {
      const updatedOrder = await Order.findByIdAndUpdate(
        order._id,
        { status: "failed" },
        { new: true }
      );
      console.log("Order status updated to failed:", updatedOrder);
      order = updatedOrder;
    }
    res.json({
      order,
      stripeSession: {
        payment_status: session.payment_status,
        status: session.status,
      },
    });
  } catch (error) {
    console.error("Check payment status error:", error);
    res.status(500).json({
      error: "Failed to check payment status",
      details: error.message,
    });
  }
};

//GETORDERSTATUS
const getOrderStatus = async (req, res) => {
  try {
    const { sessionId } = req.params;
    console.log("Getting order status for session:", sessionId);
    const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    let order = await Order.findOne({ stripeSessionId: sessionId });
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    if (session.payment_status === "paid" && order.status === "pending") {
      order = await Order.findByIdAndUpdate(
        order._id,
        { status: "success" },
        { new: true }
      );
      console.log("Auto-updated order status to success");
    }
    res.json(order);
  } catch (error) {
    console.error("Get order status error:", error);
    res.status(500).json({ error: "Failed to get order status" });
  }
};

module.exports = {
  createPaymentSession,
  handleWebhook,
  getOrderStatus,
  checkPaymentStatus,
};
