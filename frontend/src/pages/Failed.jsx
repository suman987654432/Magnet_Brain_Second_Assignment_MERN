import { Link } from "react-router-dom";

function Failed() {
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
          style={{ color: "#dc3545", fontSize: "60px", marginBottom: "20px" }}
        >
          ❌
        </div>
        <h2 style={{ color: "#dc3545", marginBottom: "20px" }}>
          Payment Failed!
        </h2>
        <p style={{ marginBottom: "20px" }}>
          We're sorry, but your payment could not be processed. Please try again
          or contact support if the problem persists.
        </p>

        <div
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Link to="/checkout">
            <button
              style={{
                padding: "12px 20px",
                background: "#6772e5",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              Try Again
            </button>
          </Link>

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
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Failed;
