import ProductList from "../components/ProductList";
import CartIcon from "../components/CartIcon";

function Home() {
  return (
    <div style={{ padding: "30px", maxWidth: "1100px", margin: "auto", backgroundColor: "#f9f9f9" }}>
      <header
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
       <h2 style={{color:"red",alignItems: "center" }}>  WELCOME TO OUR <span style={{color:"blue" }}>STORE!</span> </h2>
       
      
      </header>
      <>
      <div
      style={{
          display: "flex",
          justifyContent: "end",
          marginRight: "20px",
        
        }}
      ><CartIcon /></div>
      </>

      <ProductList />
    </div>
  );
}

export default Home;
