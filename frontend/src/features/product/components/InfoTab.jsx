import styles from "./InfoTab.module.css";

function InfoTab() {
  return (
    <section className={styles.section}>
      <article className={styles.infoTabList}>
        <div className={styles.infoTab}>
          <h2 className={styles.heading}>
            <img src="./icons/locate.png" alt="Location Icon" /> Delivery
            information
          </h2>
          <ul className={styles.infoList}>
            <li>
              <strong>Monday:</strong> 12:00 AM–3:00 AM, 8:00 AM–3:00 AM
            </li>
            <li>
              <strong>Tuesday:</strong> 8:00 AM–3:00 AM
            </li>
            <li>
              <strong>Wednesday:</strong> 8:00 AM–3:00 AM
            </li>
            <li>
              <strong>Thursday:</strong> 8:00 AM–3:00 AM
            </li>
            <li>
              <strong>Friday:</strong> 8:00 AM–3:00 AM
            </li>
            <li>
              <strong>Saturday:</strong> 8:00 AM–3:00 AM
            </li>
            <li>
              <strong>Sunday:</strong> 8:00 AM–12:00 AM
            </li>
            <li>
              <strong>Estimated time until delivery:</strong> 20 min
            </li>
          </ul>
        </div>
        <div className={styles.infoTab}>
          <h2 className={styles.heading}>
            <img src="./icons/contact.png" alt="Contact Info Icon" /> Delivery
            information
          </h2>
          <p className={styles.infoText}>
            If you have allergies or other dietary restrictions, please contact
            the restaurant. The restaurant will provide food-specific
            information upon request.
          </p>
          <h4>Phone number:</h4>
          <p className={styles.infoText}>+91 20 1234-18</p>
          <h4>Website</h4>
          <p className={styles.infoText}>http://mcdonalds.uk/</p>
        </div>
        <div className={styles.infoTab}>
          <h2 className={styles.heading}>
            <img src="./icons/time.png" alt="Time Icon" />
            Operational Times
          </h2>
          <ul className={styles.infoList}>
            <li>
              <strong>Monday:</strong> 8:00 AM–3:00 AM
            </li>
            <li>
              <strong>Tuesday:</strong> 8:00 AM–3:00 AM
            </li>
            <li>
              <strong>Wednesday:</strong> 8:00 AM–3:00 AM
            </li>
            <li>
              <strong>Thursday:</strong> 8:00 AM–3:00 AM
            </li>
            <li>
              <strong>Friday:</strong> 8:00 AM–3:00 AM
            </li>
            <li>
              <strong>Saturday:</strong> 8:00 AM–3:00 AM
            </li>
            <li>
              <strong>Sunday:</strong> 8:00 AM–3:00 AM
            </li>
          </ul>
        </div>
      </article>
    </section>
  );
}

export default InfoTab;
