import ProductList from "../components/ProductList";
import CartIcon from "../components/CartIcon";

function Home() {
  return (
    <div
      style={{
        padding: "30px",
        maxWidth: "1100px",
        margin: "auto",
        backgroundColor: "#f9f9f9",
      }}
    >
    
      <header
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #8af081ff 0%, #b58fdbff 100%)",
          padding: "20px",
          borderRadius: "15px",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
          marginBottom: "20px",
          border: "1px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        <h2
          style={{
            color: "#ffffff",
            fontSize: "2.5rem",
            fontWeight: "bold",
            textAlign: "center",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
            letterSpacing: "2px",
            margin: "0",
            fontFamily: "'Arial', sans-serif",
          }}
        >
          WELCOME TO OUR
          <span
            style={{
              color: "#ffd700",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
              fontWeight: "900",
            }}
          >
            STORE!
          </span>
        </h2>
      </header>
      <>
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            marginRight: "20px",
          }}
        >
          <CartIcon />
        </div>
      </>

      <ProductList />
    </div>
  );
}

export default Home;
