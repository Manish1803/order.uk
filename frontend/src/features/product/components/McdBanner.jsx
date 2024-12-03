import styles from "./McdBanner.module.css";

import { IoIosTime } from "react-icons/io";

function McdBanner({ data: banner, appRating }) {
  return (
    <section className={styles.section}>
      <article
        style={{
          backgroundImage: `linear-gradient(to top right, #03081Ff0, #03081Fd1), url(${banner})`,
        }}
        className={styles.container}
      >
        <div className={styles.details}>
          <p>I&apos;m loving it!</p>
          <h2 className={styles.heading}>McDonald&apos;s East London</h2>
          <ul className={styles.infoList}>
            <li className={styles.infoItem}>
              <img src="/icons/done.png" alt="Order Completed Icon" />
              <h3>Minimum Order: 12 GBP</h3>
            </li>
            <li className={styles.infoItem}>
              <img src="/icons/rider.png" alt="Rider Icon" />
              <h3>Delivery in 20-25 Minutes</h3>
            </li>
          </ul>
        </div>
        <div className={styles.cimage}>
          <img src={banner} alt="McDonald's Meal" className={styles.image} />

          <img src={appRating} alt="Star Icon" className={styles.appRating} />
        </div>
        <div className={styles.dealClose}>
          <IoIosTime size="2.5rem" />
          <p>Open until 3:00 AM</p>
        </div>
      </article>
    </section>
  );
}

export default McdBanner;
