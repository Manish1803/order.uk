import styles from "./DownloadBanner.module.css";

function DownloadBanner({ data }) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <img
          src={data.downloadBanner}
          alt="People using Order.uk App"
          className={styles.cimage}
        />
        <div className={styles.details}>
          <h3 className={styles.heading}>
            <img src={data.logo} alt="Order.uk Logo" />
            ing is more
          </h3>
          <h3 className={styles.subHeading}>
            <span>Personalised</span> & Instant
          </h3>
          <p>Download the Order.uk app for faster ordering</p>
          <img src={data.downloadLogo} alt="Order.uk Logo" />
        </div>
      </div>
    </section>
  );
}

export default DownloadBanner;
