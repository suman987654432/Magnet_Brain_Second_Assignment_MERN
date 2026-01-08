import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { ImCross } from "react-icons/im";
import { SiTicktick } from "react-icons/si";
function Success() {
  const [searchParams] = useSearchParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { clearCart } = useCart();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    const fetchAndUpdateOrderStatus = async () => {
      if (!sessionId) {
        setError("No session ID provided");
        setLoading(false);
        return;
      }

      try {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        const checkResponse = await fetch(
          `http://localhost:4000/check-payment/${sessionId}`
        );

        if (!checkResponse.ok) {
          throw new Error("Failed to check payment status");
        }

        const checkData = await checkResponse.json();
        console.log("Payment check response:", checkData);

        if (checkData.order) {
          setOrderDetails(checkData.order);

          // Clear cart if payment is successful
          if (checkData.order.status === "success" && clearCart) {
            clearCart();
            console.log("Cart cleared after successful payment");
          }
        } else {
          setError("Failed to fetch order details");
        }
      } catch (error) {
        console.error("Failed to check payment status:", error);
        setError("Error loading payment status: " + error.message);
      }

      setLoading(false);
    };

    fetchAndUpdateOrderStatus();
  }, [sessionId, clearCart]);

  useEffect(() => {
    if (orderDetails?.status === "pending") {
      const timer = setTimeout(() => {
        console.log("Payment still pending, refreshing...");
        window.location.reload();
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [orderDetails?.status]);

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#f4f6f8",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "40px", marginBottom: "20px" }}></div>
          <h2>Processing your payment...</h2>
          <p>Please wait </p>
        </div>
      </div>
    );
  }

  if (error) {
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
            padding: "40px",
            borderRadius: "8px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            textAlign: "center",
            maxWidth: "500px",
          }}
        >
          <div
            style={{
              color: "#dc3545",
              fontSize: "60px",
              marginBottom: "20px",
            }}
          >
            <ImCross />
          </div>
          <h2 style={{ color: "#dc3545" }}>Error</h2>
          <p>{error}</p>
          <div style={{ marginTop: "20px" }}>
            <button
              onClick={() => window.location.reload()}
              style={{
                padding: "12px 20px",
                background: "#6772e5",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "16px",
                marginRight: "10px",
              }}
            >
              Try Again
            </button>
            <Link to="/">
              <button
                style={{
                  padding: "12px 20px",
                  background: "#6c757d",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "16px",
                }}
              >
                Go Home
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (orderDetails?.status === "pending") {
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
            padding: "40px",
            borderRadius: "8px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            textAlign: "center",
            maxWidth: "500px",
          }}
        >
          <div
            style={{
              color: "#ffc107",
              fontSize: "60px",
              marginBottom: "20px",
            }}
          >
            <ImCross />
          </div>
          <h2 style={{ color: "#ffc107" }}>Payment Processing</h2>
          <p>
            your payment is processing wait 5 second automatically
            refresh.......
          </p>
          <div style={{ marginTop: "20px" }}>
            <button
              onClick={() => window.location.reload()}
              style={{
                padding: "12px 20px",
                background: "#6772e5",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "16px",
                marginRight: "10px",
              }}
            >
              Refresh Now
            </button>
            <Link to="/">
              <button
                style={{
                  padding: "12px 20px",
                  background: "#6c757d",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "16px",
                }}
              >
                Go Home
              </button>
            </Link>
          </div>
        </div>
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
          padding: "40px",
          borderRadius: "8px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          textAlign: "center",
          maxWidth: "500px",
          width: "100%",
        }}
      >
        <div
          style={{ color: "#28a745", fontSize: "60px", marginBottom: "20px" }}
        >
          <SiTicktick />
        </div>
        <h2 style={{ color: "#28a745", marginBottom: "20px" }}>
          Payment Successful!
        </h2>
        <p style={{ marginBottom: "20px" }}>
          Thank you for your purchase. Your order has been confirmed.
        </p>

        {orderDetails && (
          <div
            style={{
              marginBottom: "20px",
              textAlign: "left",
              background: "#f8f9fa",
              padding: "15px",
              borderRadius: "4px",
            }}
          >
            <h3>Order Details:</h3>
            <p>
              <strong>Order ID:</strong> {orderDetails._id}
            </p>
            <p>
              <strong>Total Amount:</strong> ${orderDetails.amount.toFixed(2)}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span
                style={{
                  color:
                    orderDetails.status === "success" ? "#28a745" : "#ffc107",
                  fontWeight: "bold",
                  marginLeft: "5px",
                }}
              >
                {orderDetails.status.toUpperCase()}
              </span>
            </p>
            <p>
              <strong>Email:</strong> {orderDetails.email}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(orderDetails.createdAt).toLocaleDateString()}
            </p>

            <div style={{ marginTop: "10px" }}>
              <strong>Items:</strong>
              {orderDetails.items.map((item, index) => (
                <div
                  key={index}
                  style={{ marginLeft: "10px", fontSize: "14px" }}
                >
                  • {item.name} x{item.quantity} - $
                  {(item.price * item.quantity).toFixed(2)}
                </div>
              ))}
            </div>
          </div>
        )}

        <Link to="/">
          <button
            style={{
              padding: "12px 30px",
              background: "#3c4bebff",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Success;
