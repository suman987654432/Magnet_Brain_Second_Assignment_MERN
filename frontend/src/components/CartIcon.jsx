import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { FaCartArrowDown } from "react-icons/fa";

function CartIcon() {
  const { cartItems } = useCart();

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
   
    <>
     <Link
      to="/cart"
      style={{
        position: "relative",
        textDecoration: "none",
        color: "#000",
        fontWeight: "bold",
        fontSize: "24px",
        
      }}
    >
      <FaCartArrowDown />
      {totalItems > 0 && (
        <span
          style={{
            position: "absolute",
            top: "-8px",
            right: "-12px",
            background: "red",
            color: "#fff",
            borderRadius: "50%",
            padding: "2px 6px",
            fontSize: "12px",
          }}
        >
          {totalItems}
        </span>
      )}
    </Link>
    
    </>
  );
}

export default CartIcon;
