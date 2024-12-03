import styles from "./Footer.module.css";

import { BsFacebook } from "react-icons/bs";
import { RiInstagramFill } from "react-icons/ri";
import { AiFillTikTok } from "react-icons/ai";
import { FaSnapchatSquare } from "react-icons/fa";

function Footer() {
  return (
    <footer className={styles.footer}>
      <article className={styles.footerNavContainer}>
        <div className={styles.logoCol}>
          <img
            className={styles.footerLogo}
            src="/footerLogo.png"
            alt="Order.uk Logo"
          />
          <img
            className={styles.downloadLogo}
            src="/downloadLogo.png"
            alt="Download App"
          />
          <p>Company # 490039-445, Registered with House of companies.</p>
        </div>

        <div className={styles.subCol}>
          <p className={styles.footerHeading}>
            Get Exclusive Deals in your Inbox
          </p>
          <div className={styles.inputEmail}>
            <input type="text" placeholder="youremail@gmail.com" />
            <button>Subscribe</button>
          </div>
          <p className={styles.spam}>
            we wont spam, read our{" "}
            <span className={styles.footerLink}>email policy</span>
          </p>
          <ul className={styles.socialLinks}>
            <li>
              <BsFacebook size="3em" />
            </li>
            <li>
              <RiInstagramFill size="3em" />
            </li>
            <li>
              <AiFillTikTok size="3em" />
            </li>
            <li>
              <FaSnapchatSquare size="3em" />
            </li>
          </ul>
        </div>

        <div className={styles.navCol}>
          <p className={styles.footerHeading}>Legal Pages</p>
          <ul className={styles.footerNav}>
            <li className={styles.footerLink}>Privacy Policy</li>
            <li className={styles.footerLink}>Terms</li>
            <li className={styles.footerLink}>Cookies</li>
            <li className={styles.footerLink}>Modern Slavery Statement</li>
          </ul>
        </div>

        <div className={styles.navCol}>
          <p className={styles.footerHeading}>Important Links</p>
          <ul className={styles.footerNav}>
            <li className={styles.footerLink}>Get Help</li>
            <li className={styles.footerLink}>Add your restaurant</li>
            <li className={styles.footerLink}>Sign up to deliver</li>
            <li className={styles.footerLink}>Create a business account</li>
          </ul>
        </div>
      </article>
      <article className={styles.copyright}>
        <p>Order.uk Copyright 2024, All Rights Reserved.</p>
        <nav className={styles.outLink}>
          <ul className={styles.links}>
            <li>Privacy Policy</li>
            <li>Terms</li>
            <li>Pricing</li>
            <li>Do not sell or share my personal information</li>
          </ul>
        </nav>
      </article>
    </footer>
  );
}

export default Footer;
