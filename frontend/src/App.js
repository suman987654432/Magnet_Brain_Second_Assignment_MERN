import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Cart from "./pages/Cart";
import Checkout from "./pages/ChexkOut";
import Success from "./pages/Success";
import Failed from "./pages/Failed";
function App() {
  return (
    <Router>
      <CartProvider>
        <div className="App">
          <Routes>
            
            <Route
              path="/"
              element={<div>Home Page - Add your home component</div>}
            />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/success" element={<Success />} />
            <Route path="/failed" element={<Failed />} />
        
          </Routes>
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;
