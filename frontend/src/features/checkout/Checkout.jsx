import styles from "./Checkout.module.css";
import { useApp } from "./../../contexts/AppContext";

import {
  CartModelButton,
  MobileProfile,
  StickyBar,
  MainNavBar,
  Main,
  Spinner,
  RestaurantList,
  Footer,
} from "./../../components";
import { useNavigate } from "react-router-dom";

import { MdLocationOn } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa6";
import { FaCircleArrowLeft } from "react-icons/fa6";

import { MdKeyboardArrowRight } from "react-icons/md";

function Checkout() {
  const navigate = useNavigate();
  const {
    isMobile,
    websiteData: data,
    foodItems: foodData,
    cartItems,
    currency,
    getTotalPrice,
  } = useApp();

  if (!data) return <Spinner />;

  let totalItems = 0;

  return (
    <>
      {!isMobile && (
        <StickyBar>
          <CartModelButton />
        </StickyBar>
      )}
      <MainNavBar />
      {isMobile && <MobileProfile />}
      <Main>
        <section className={styles.section}>
          {!isMobile ? (
            <h2 className={styles.heading}>
              <FaArrowLeft onClick={() => navigate(-1)} />
              <span>Your Product Details</span>
            </h2>
          ) : (
            <h2 className={styles.heading}>
              <FaCircleArrowLeft
                color="#FC8A06"
                size="3rem"
                onClick={() => navigate(-1)}
              />

              <span>Checkout</span>
            </h2>
          )}
          <div className={styles.checkoutContainer}>
            <div className={styles.checkoutDetails}>
              {foodData.map(
                (item, index) =>
                  cartItems[item._id] > 0 && (
                    <div className={styles.cartItem} key={index}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className={styles.itemImage}
                      />
                      <div className={styles.itemDetails}>
                        <p className={styles.itemName}>{item.name}</p>
                        {cartItems[item._id]}&times; item{" "}
                        <span className={styles.hide}>
                          {(totalItems += cartItems[item._id])}
                        </span>
                      </div>
                      <p className={styles.itemPrice}>
                        {currency} {item.price}
                      </p>
                    </div>
                  )
              )}
              <div className={styles.checkoutNotes}>
                <p>Notes</p>
                <input type="text" placeholder="Add order notes" />
              </div>
            </div>
            <div className={styles.checkoutSummary}>
              <div className={styles.deliveryAddress}>
                <div className={styles.circle}>
                  <MdLocationOn color="#FC8A06" size="2rem" />
                </div>
                <div className={styles.address}>
                  <p className={styles.addressTitle}>Delivery Address</p>
                  <p className={styles.addressText}>34, London, UK</p>
                </div>
                <MdKeyboardArrowRight size="2.5rem" color="#FC8A06" />
              </div>

              <h2>Order Summary</h2>

              <ul className={styles.summary}>
                <li>Items</li>
                <li>{getTotalPrice()}</li>
              </ul>
              <ul className={styles.summary}>
                <li>Sales Tax</li>
                <li>10</li>
              </ul>
              <ul className={styles.summaryTotal}>
                <li>Subtotal ({totalItems} items)</li>
                <li>{getTotalPrice() === 0 ? 0 : getTotalPrice() + 10}</li>
              </ul>

              <button
                className={styles.paymentButton}
                onClick={() => navigate("/payment")}
              >
                Choose Payment Method
              </button>
            </div>
          </div>
        </section>

        {!isMobile && (
          <RestaurantList title={"Similar"} data={data.popularRestaurants} />
        )}
      </Main>
      {!isMobile && <Footer />}
    </>
  );
}

export default Checkout;
