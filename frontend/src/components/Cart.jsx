import styles from "./Cart.module.css";
import { IoShareSocialOutline } from "react-icons/io5";
import { MdDeleteForever } from "react-icons/md";
import { FaCircleArrowDown } from "react-icons/fa6";
import { FaCircleArrowRight } from "react-icons/fa6";
import Spinner from "./Spinner";
import { useApp } from "./../contexts/AppContext";
import { useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();

  const {
    cartItems,
    foodItems: foodData,
    removeFromCart,
    currency,
    getTotalPrice,
    deliveryCharge,
    isDataLoading,
  } = useApp();

  if (isDataLoading) return <Spinner />;

  return (
    <article className={styles.cart} onClick={(e) => e.stopPropagation()}>
      <div className={styles.cartShare}>
        <IoShareSocialOutline size="5rem" />
        <p className={styles.shareText}>Share this cart with your friends</p>
        <button className={styles.btnCopyLink}>Copy Link</button>
      </div>

      <div className={styles.cartBasket}>
        <div className={styles.cartheader}>
          <img
            src="/icons/basket.png"
            alt="Basket Icon"
            className={styles.icon}
          />
          <p className={styles.heading}>My Basket</p>
        </div>

        <div className={styles.cartItems}>
          {foodData.map(
            (item, index) =>
              cartItems[item._id] > 0 && (
                <div className={styles.cartItem} key={index}>
                  <div className={styles.circle}>
                    {cartItems[item._id]} &times;
                  </div>
                  <div>
                    <p className={styles.itemPrice}>
                      {currency} {item.price}
                    </p>
                    <p className={styles.itemName}>{item.name}</p>
                  </div>
                  <div>
                    <MdDeleteForever
                      size="3rem"
                      color="#35A60D"
                      onClick={() => removeFromCart(item._id)}
                    />
                  </div>
                </div>
              )
          )}
        </div>

        <ul className={styles.cartBlock}>
          <li className={styles.subtitle}>Sub Total:</li>
          <li>
            {currency} {getTotalPrice()}
          </li>
        </ul>
        <ul className={styles.cartBlock}>
          <li className={styles.subtitle}>Discounts:</li>
          <li>{currency} 20</li>
        </ul>
        <ul className={styles.cartBlock}>
          <li className={styles.subtitle}>Delivery Fee:</li>
          <li>
            {currency} {getTotalPrice() === 0 ? 0 : deliveryCharge}
          </li>
        </ul>

        <div className={styles.cartDivider}>
          <div className={styles.ctotal}>
            <p>Total to pay:</p>
            <p className={styles.totalPrice}>
              {" "}
              {currency}
              {getTotalPrice() === 0
                ? 0
                : getTotalPrice() + deliveryCharge - 20}
            </p>
          </div>
          <div className={styles.coupon}>
            <p>Choose your free item..</p>
            <FaCircleArrowDown size="3rem" color="#949494" />
          </div>
          <div className={styles.coupon}>
            <p>Apply Coupon Code here..</p>
            <FaCircleArrowRight size="3rem" color="#35A60D" />
          </div>
        </div>
        <div className={styles.cartFooter}>
          <div className={styles.fcontainer}>
            <div className={styles.delivery}>
              <img src="/icons/delivery.png" alt="Delivery Icon" />
              <h3>Delivery</h3>
              <p>Starts at 17:50</p>
            </div>
            <div className={styles.collection}>
              <img src="/icons/collection.png" alt="Collection Icon" />
              <h3>Collection</h3>
              <p>Starts at 16:50</p>
            </div>
          </div>
          <button
            className={styles.btnCheckout}
            onClick={() => navigate("/checkout")}
            disabled={getTotalPrice() < 20}
          >
            <FaCircleArrowRight size="3rem" color="#fff" /> <p>Checkout!</p>
          </button>
          {getTotalPrice() < 20 && (
            <p className={styles.warning}>
              Minimum delivery is ₹20, You must Spend ₹10 more for the checkout!
            </p>
          )}
        </div>
      </div>
    </article>
  );
}

export default Cart;
