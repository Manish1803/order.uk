import styles from "./StickyBar.module.css";

function StickyBar({ children }) {
  return (
    <header className={styles.stickyBar}>
      <div className={styles.container}>
        <p className={styles.promoText}>
          <span>🌟</span> Get 5% Off your first order,{" "}
          <span className={styles.promo}>Promo: ORDER5</span>
        </p>
        <div className={styles.child}>{children}</div>
      </div>
    </header>
  );
}

export default StickyBar;
