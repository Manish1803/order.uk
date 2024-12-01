import styles from "./CartModelButton.module.css";

import { FaCircleArrowDown } from "react-icons/fa6";

function CartModelButton() {
  return (
    <div className={styles.cartButton}>
      <div className={styles.cartText}>
        <img
          src="./icons/basket.png"
          alt="Cart Basket Icon"
          className={styles.cartIcon}
        />
        <p>My Cart</p>
      </div>
      <FaCircleArrowDown size="2.5rem" color="#fff" className={styles.arrow} />
    </div>
  );
}

export default CartModelButton;
