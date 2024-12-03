import styles from "./MobileProfile.module.css";
import { useAuth } from "../contexts/UserContext";
import CartModelButton from "./CartModelButton";

import { useNavigate } from "react-router-dom";
import { FaCircleUser } from "react-icons/fa6";
import Spinner from "./Spinner";

function MobileProfile() {
  const { user, username, isAuthenticate } = useAuth();
  const navigate = useNavigate();

  if (!user) return <Spinner />;

  return (
    <article className={styles.mobileProfile}>
      {isAuthenticate ? (
        <div className={styles.profile} onClick={() => navigate("/profile")}>
          <img
            src="./profile.jpeg"
            alt="User Profile Picture"
            className={styles.profilePic}
          />
          <p>Hey {username}</p>
        </div>
      ) : (
        <div className={styles.profileLogin} onClick={() => navigate("/")}>
          <FaCircleUser color="#03081f" size="3rem" />
          <p>Login/Signup</p>
        </div>
      )}
      <CartModelButton />
    </article>
  );
}

export default MobileProfile;
