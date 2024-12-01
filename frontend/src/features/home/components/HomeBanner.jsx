import styles from "./HomeBanner.module.css";

function HomeBanner({ data }) {
  return (
    <section className="section">
      <article className={styles.homeBanner}>
        <div className={styles.bannerDetails}>
          <div className={styles.bannerHeading}>
            <p>Order Restaurant food, takeaway and groceries.</p>
            <h1>Feast Your Senses,</h1>
            <h1>
              <span>Fast and Fresh</span>
            </h1>
          </div>
          <div>
            <p>Enter a postcode to see what we deliver</p>
            <div className={styles.inputEmail}>
              <input type="text" placeholder="e.g. EC4R 3TE" />
              <button>Search</button>
            </div>
          </div>
        </div>
        <img src={data} alt="Banner" className={styles.bannerImage} />
      </article>
    </section>
  );
}

export default HomeBanner;
