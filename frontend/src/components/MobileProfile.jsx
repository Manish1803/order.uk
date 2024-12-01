import CartModelButton from "./CartModelButton";
import styles from "./MobileProfile.module.css";

function MobileProfile() {
  return (
    <article className={styles.mobileProfile}>
      <div className={styles.profile}>
        <img
          src="./profile.jpeg"
          alt="User Profile Picture"
          className={styles.profilePic}
        />
        <p>Hey Mike</p>
      </div>
      <CartModelButton />
    </article>
  );
}

export default MobileProfile;
