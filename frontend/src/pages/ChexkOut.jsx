import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
function Checkout() {
  const { cartItems, addToCart, removeFromCart } = useCart();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const validateForm = () => {
    if (!email) {
      alert("Email is required before payment");
      return false;
    }
    if (!email.includes("@")) {
      alert("Please enter a valid email address");
      return false;
    }
    if (cartItems.length === 0) {
      alert("Cart is empty");
      return false;
    }
    return true;
  };

  const handlePayment = async () => {
    if (!validateForm()) {
      return;
    }
    setLoading(true);

    try {
      console.log("Starting payment process...");
      console.log("Cart items:", cartItems);
      console.log("Email:", email);
      console.log("Total amount:", totalAmount);

      // Validate cart items before sending
      const validItems = cartItems.filter(
        (item) => item.name && item.price > 0 && item.quantity > 0
      );

      if (validItems.length === 0) {
        alert("No valid items in cart");
        setLoading(false);
        return;
      }

      const response = await fetch(
        "http://localhost:4000/create-payment-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            items: validItems,
            email: email.trim(),
            amount: totalAmount,
          }),
        }
      );

      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create payment session");
      }

      const data = await response.json();
      console.log("Response data:", data);

      if (data.url) {
        console.log("Redirecting to Stripe:", data.url);
        // Add a small delay before redirect
        setTimeout(() => {
          window.location.href = data.url;
        }, 500);
      } else {
        throw new Error("No payment URL received");
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment failed. Please try again. Error: " + error.message);
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <h2>Your cart is empty</h2>
        <Link to="/" style={{ color: "#6772e5", textDecoration: "none" }}>
          continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f4f6f8",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "30px",
          width: "100%",
          maxWidth: "500px",
          borderRadius: "8px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <h2>Checkout</h2>
          <Link to="/cart" style={{ color: "#6772e5", textDecoration: "none" }}>
            ← Back to Cart
          </Link>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <h3>Order Summary</h3>
          {cartItems.map((item, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "10px",
                padding: "10px",
                background: "#f8f9fa",
                borderRadius: "4px",
              }}
            >
              <span>{item.name}</span>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <button
                  onClick={() => removeFromCart(item.id)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "16px",
                  }}
                >
                  ➖
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => addToCart(item)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "16px",
                  }}
                >
                  ➕
                </button>
              </div>

              <span>
                <strong>${(item.price * item.quantity).toFixed(2)}</strong>
              </span>
            </div>
          ))}
        </div>

        <hr style={{ margin: "20px 0" }} />

        <p
          style={{
            fontSize: "18px",
            textAlign: "right",
            marginBottom: "20px",
          }}
        >
          <strong>Total: ${totalAmount.toFixed(2)}</strong>
        </p>

        <div style={{ marginTop: "20px" }}>
          <h3>Contact Information</h3>
          <input
            type="email"
            placeholder="Enter your email *"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "15px",
              border: "1px solid #ddd",
              borderRadius: "4px",
            }}
          />
        </div>

        <button
          onClick={handlePayment}
          disabled={loading}
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "10px",
            background: "#6772e5",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: loading ? "not-allowed" : "pointer",
            fontSize: "16px",
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? "Processing..." : "Proceed to Payment"}
        </button>
      </div>
    </div>
  );
}

export default Checkout;
