import styles from "./Success.module.css";

import { useApp } from "./../../contexts/AppContext";

import {
  CartModelButton,
  MobileProfile,
  StickyBar,
  MainNavBar,
  Main,
  Footer,
} from "./../../components";
import { useNavigate } from "react-router-dom";

function Success() {
  const navigate = useNavigate();
  const {
    isMobile,
    foodItems: foodData,
    cartItems,
    setCartItems,
    setAvailableBalance,
  } = useApp();

  const handleReset = () => {
    setCartItems([]);
    setAvailableBalance(1000);
    navigate("/home");
  };

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
          <div className={styles.container}>
            <div className={styles.outer}>
              <img src="/icons/checkmark.png" alt="" />
            </div>
            <h3 className={styles.heading}>Order Placed Successfully</h3>
            <p className={styles.subHeading}>
              Your order is confirmed and on its way. Get set to savor your
              chosen delights!
            </p>
            <div className={styles.order}>
              <ul className={styles.orderList}>
                {foodData.map(
                  (item, index) =>
                    cartItems[item._id] > 0 && (
                      <li className={styles.cartItem} key={index}>
                        {item.name}
                      </li>
                    )
                )}
              </ul>
              <button className={styles.btn} onClick={handleReset}>
                Back to Home
              </button>
            </div>
          </div>
        </section>
      </Main>
      {!isMobile && <Footer />}
    </>
  );
}

export default Success;
