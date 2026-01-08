import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Cart() {
  const { cartItems, addToCart, removeFromCart } = useCart();

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div
        style={{
          padding: "30px",
          maxWidth: "1100px",
          margin: "auto",
          textAlign: "center",
        }}
      >
        <h2>Your Cart is Empty</h2>
        <Link to="/" style={{ color: "#6772e5", textDecoration: "none" }}>
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: "30px", maxWidth: "1100px", margin: "auto" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <h2>Shopping Cart</h2>
        <Link to="/" style={{ color: "#6772e5", textDecoration: "none" }}>
          Continue Shopping
        </Link>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {cartItems.map((item) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "20px",
              background: "#fff",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <img
              src={item.image}
              alt={item.name}
              style={{
                width: "100px",
                height: "100px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />

            <div style={{ flex: 1, marginLeft: "20px" }}>
              <h3 style={{ margin: "0 0 10px 0" }}>{item.name}</h3>
              <p style={{ margin: "0", color: "#666" }}>${item.price}</p>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <button
                onClick={() => removeFromCart(item.id)}
                style={{
                  padding: "5px 10px",
                  background: "#f8f9fa",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                -
              </button>

              <span style={{ minWidth: "30px", textAlign: "center" }}>
                {item.quantity}
              </span>

              <button
                onClick={() => addToCart(item)}
                style={{
                  padding: "5px 10px",
                  background: "#f8f9fa",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                +
              </button>
            </div>

            <div
              style={{
                marginLeft: "20px",
                minWidth: "80px",
                textAlign: "right",
              }}
            >
              <strong>${(item.price * item.quantity).toFixed(2)}</strong>
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: "30px",
          padding: "20px",
          background: "#f8f9fa",
          borderRadius: "8px",
          textAlign: "right",
        }}
      >
        <h3>Total: ${totalPrice.toFixed(2)}</h3>
        <Link to="/checkout">
          <button
            style={{
              marginTop: "10px",
              padding: "12px 30px",
              background: "#6772e5",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Proceed to Checkout
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Cart;
