import { NavLink, useLocation } from "react-router-dom";
import styles from "./CartModelButton.module.css";

import { FaCircleArrowDown } from "react-icons/fa6";

function CartModelButton() {
  const location = useLocation();
  const path = location.pathname === "/product/cart";

  return (
    <NavLink
      to={`${path ? "/product" : "/product/cart"}`}
      style={{ textDecoration: "none", height: "100%" }}
    >
      <div className={styles.cartButton}>
        <div className={styles.cartText}>
          <img
            src="/icons/basket.png"
            alt="Cart Basket Icon"
            className={styles.cartIcon}
          />
          <p>My Cart</p>
        </div>
        <FaCircleArrowDown
          size="2.5rem"
          color="#fff"
          className={styles.arrow}
        />
      </div>
    </NavLink>
  );
}

export default CartModelButton;
