import styles from "./AddCard.module.css";

function AddCard({ setShowAddCard }) {
  return (
    <section className={styles.overlay}>
      <article className={styles.addCard} onClick={(e) => e.stopPropagation()}>
        <div className={styles.cardForm}>
          <h2 className={styles.cardHeader}>Add Payment Method</h2>
          <label htmlFor="cardNumber">Card Number</label>
          <input
            type="text"
            name="cardNumber"
            id="cardNumber"
            placeholder="XXXX XXXX XXXX 1234"
          />
          <label htmlFor="expiry">Expiration</label>
          <input type="text" name="expiry" id="expiry" placeholder="MM/YY" />
          <label htmlFor="cvv">CVV</label>
          <input type="text" name="cvv" id="cvv" placeholder="XXX" />
          <label htmlFor="name">Name on card</label>
          <input type="text" name="name" id="name" placeholder="Manish Patil" />
        </div>
        <div className={styles.action}>
          <button
            className={styles.remove}
            onClick={() => setShowAddCard(false)}
          >
            Remove
          </button>
          <div className={styles.btns}>
            <span>Cancel</span>
            <button type="submit" onClick={() => setShowAddCard(false)}>
              Save Changes
            </button>
          </div>
        </div>
      </article>
    </section>
  );
}

export default AddCard;
