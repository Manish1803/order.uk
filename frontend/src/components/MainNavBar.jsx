import styles from "./MainNavBar.module.css";
import { useApp } from "./../contexts/AppContext";
import { useAuth } from "../contexts/UserContext";

import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import { IoMenu, IoClose } from "react-icons/io5";
import { FaCircleUser } from "react-icons/fa6";

function MainNavBar() {
  const { username, isAuthenticate } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { isMobile } = useApp();
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <header className={`${styles.header} ${isNavOpen && styles.navOpen}`}>
      <img className={styles.navLogo} src="/logo.png" alt="Order.uk Logo" />

      <nav className={styles.mainNav}>
        <ul className={styles.navList}>
          <li className={styles.navLink}>
            <NavLink to="/home">Home</NavLink>
          </li>
          {location.pathname === "/home" && (
            <li className={styles.navLink}>Browser Menu</li>
          )}
          <li className={styles.navLink}>Special Offers</li>
          <li className={styles.navLink}>
            <NavLink to="/product">Restaurants</NavLink>
          </li>
          <li className={styles.navLink}>Track Order</li>
        </ul>
        {!isMobile &&
          (!isAuthenticate ? (
            <div className={styles.userProfile} onClick={() => navigate("/")}>
              <FaCircleUser color="#fc8a06" size="1.6rem" />
              <p className={styles.userName}>Login/Signup </p>
            </div>
          ) : (
            <div
              className={styles.userProfile}
              onClick={() => navigate("/profile")}
            >
              <FaCircleUser color="#fc8a06" size="1.6rem" />
              <p className={styles.userName}>Hey {username}</p>
            </div>
          ))}
      </nav>

      {isMobile && (
        <button
          className={styles.mobileMenu}
          onClick={() => setIsNavOpen((is) => !is)}
        >
          {!isNavOpen ? (
            <IoMenu className={styles.mobileIcon} />
          ) : (
            <IoClose className={styles.mobileIcon} />
          )}
        </button>
      )}
    </header>
  );
}

export default MainNavBar;
