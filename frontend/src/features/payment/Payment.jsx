import styles from "./Payment.module.css";

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

import { FaArrowLeft } from "react-icons/fa6";
import { FaCircleArrowLeft } from "react-icons/fa6";
import { MdKeyboardArrowRight } from "react-icons/md";

function Payment() {
  const {
    isMobile,
    currency,
    availableBalance,
    getTotalPrice,
    setAvailableBalance,
  } = useApp();
  const navigate = useNavigate();

  const handlePayment = () => {
    if (availableBalance < getTotalPrice()) {
      alert("Insufficient balance! Please add funds to your wallet.");
    } else {
      const amount = availableBalance - getTotalPrice();
      setAvailableBalance(amount);
      navigate("/success");
    }
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
          {!isMobile ? (
            <h2 className={styles.heading}>
              <FaArrowLeft onClick={() => navigate(-1)} />
              <span>Choose and Pay</span>
            </h2>
          ) : (
            <h2 className={styles.heading}>
              <FaCircleArrowLeft
                color="#FC8A06"
                size="3rem"
                onClick={() => navigate(-1)}
              />

              <span>Choose and Pay</span>
            </h2>
          )}
          <article className={styles.container}>
            <div className={styles.paymentList}>
              <div className={styles.paymentOption}>
                <img
                  src="/icons/wallet.png"
                  alt="wallet Icon"
                  className={`${styles.wallet} ${styles.circle}`}
                />
                <div className={styles.details}>
                  <p>Wallet</p>
                  <p className={styles.balance}>
                    Available Balance: {currency}
                    {availableBalance}
                  </p>
                </div>
                <MdKeyboardArrowRight size="2.5rem" color="#FC8A06" />
              </div>
              <div className={styles.paymentOption}>
                <div className={styles.circle}>M</div>
                <div className={styles.details}>
                  <p>MaestroKard</p>
                </div>
              </div>
              <div className={styles.paymentOption}>
                <div className={styles.circle}>P</div>
                <div className={styles.details}>
                  <p>Paypal</p>
                </div>
              </div>
              <div className={styles.paymentOption}>
                <div className={styles.circle}>S</div>
                <div className={styles.details}>
                  <p>Stripe</p>
                </div>
              </div>
              <div className={`${styles.paymentOption} ${styles.addCard}`}>
                +
                <div className={styles.details}>
                  <p>Add Debit Card</p>
                </div>
              </div>
            </div>

            <div className={styles.paymentSummary}>
              <ul className={styles.amount}>
                <li className={styles.text}>Amount to be payed</li>
                <li className={styles.price}>
                  {currency} {getTotalPrice()}
                </li>
              </ul>

              <button className={styles.payButton} onClick={handlePayment}>
                Proceed Payment
              </button>
            </div>
          </article>
        </section>
      </Main>
      {!isMobile && <Footer />}
    </>
  );
}

export default Payment;
