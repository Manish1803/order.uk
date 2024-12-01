import styles from "./JoinUsBanner.module.css";

function JoinUsBanner({ data: banners }) {
  return (
    <section className={styles.section}>
      <div className={styles.joinUs}>
        {banners.map((banner) => (
          <div className={styles.banner} key={banner.id}>
            <div
              style={{
                backgroundImage: `linear-gradient(to top right, #03081Ff1, #03081F4a, #fff0), url(${banner.image})`,
              }}
              className={styles.bannerImage}
            />
            <div className={styles.bannerDetails}>
              <p className={styles.bannerSubtitle}>{banner.subtitle}</p>
              <h3 className={styles.bannerHeading}>{banner.title}</h3>
              <button className={styles.bannerButton}>{banner.button}</button>
            </div>
            <p className={styles.bannerDesc}>{banner.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default JoinUsBanner;
