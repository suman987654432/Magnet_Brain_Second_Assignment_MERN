import { useState } from "react";
import { useCart } from "../context/CartContext";
import Card from "./Card";
import productsData from "../data/data";
function ProductList() {
  const { addToCart } = useCart();
  const [search, setSearch] = useState("");

  const filteredProducts = productsData.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* Search bar */}
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "20%",
          marginLeft: "400px",
          padding: "10px",
          margin: "20px 0",
          borderRadius: "6px",
          border: "1px solid #ccc",
        }}
      />

      {/* Product grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
          backgroundColor: "#f5f5f5",
          padding: "20px",
        }}
      >
        {filteredProducts.map((product) => (
          <Card key={product.id} product={product} onAddToCart={addToCart} />
        ))}
      </div>
    </div>
  );
}

export default ProductList;
