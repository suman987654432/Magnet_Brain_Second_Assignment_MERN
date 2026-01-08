const Card = ({ product, onAddToCart }) => {
  return (
    <div
      style={{
        background: "rgba(233, 245, 247, 1)",
        borderRadius: "8px",
        overflow: "hidden",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      <img
        src={product.image}
        alt={product.name}
        style={{
          width: "100%",
          height: "180px",
          objectFit: "cover",
          transition: " transform: scale(1.5)",
        }}
      />

      <div style={{ padding: "15px" }}>
        <h3>{product.name}</h3>
        <p>₹{product.price}</p>

        <button
          onClick={() => onAddToCart(product)}
          style={{
            marginTop: "10px",
            width: "100%",
            padding: "10px",
            background: "#6772e5",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Card;
