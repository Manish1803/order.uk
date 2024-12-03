import styles from "./Profile.module.css";

import { useApp } from "./../../contexts/AppContext";

import {
  CartModelButton,
  MobileProfile,
  StickyBar,
  MainNavBar,
  Main,
  Footer,
  Spinner,
} from "./../../components";

import { useNavigate } from "react-router-dom";

import { FaArrowLeft } from "react-icons/fa6";
import { FaCircleArrowLeft } from "react-icons/fa6";
import { useAuth } from "../../contexts/UserContext";
import { useState } from "react";

function Profile() {
  const navigate = useNavigate();
  const { isMobile } = useApp();
  const { user } = useAuth();

  const [isEditable, setIsEditable] = useState(false);

  if (!user) return <Spinner />;

  return (
    <>
      {!isMobile && (
        <StickyBar>
          <CartModelButton />
        </StickyBar>
      )}
      <MainNavBar />
      {isMobile && <MobileProfile />}
      <Main>
        <section className={styles.section}>
          {!isMobile ? (
            <h2 className={styles.heading}>
              <FaArrowLeft onClick={() => navigate(-1)} />
              <span>Your Profile</span>
            </h2>
          ) : (
            <h2 className={styles.heading}>
              <FaCircleArrowLeft
                color="#FC8A06"
                size="3rem"
                onClick={() => navigate(-1)}
              />

              <span>My Profile</span>
            </h2>
          )}
          <article className={styles.container}>
            <div className={styles.profileHeader}>
              <div className={styles.profileContainer}>
                <img
                  src="./profile.jpeg"
                  alt="User Profile Picture"
                  className={styles.profilePic}
                />
                <h3 className={styles.name}>{user.name}</h3>
              </div>
              <button
                className={styles.editButton}
                onClick={() => setIsEditable((is) => !is)}
              >
                Edit
              </button>
            </div>
            <div className={styles.profileDetails}>
              <div className={styles.inputContainer}>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  placeholder="example@email.com"
                  name="name"
                  id="name"
                  value={user.name}
                  disabled={isEditable}
                />
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  placeholder="example@email.com"
                  name="email"
                  id="email"
                  value={user.email}
                  disabled={isEditable}
                />
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="text"
                  placeholder="example@email.com"
                  name="phone"
                  id="phone"
                  value={user.phone}
                  disabled={isEditable}
                />
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor="country">Country</label>
                <input
                  type="text"
                  placeholder="Enter your country"
                  name="country"
                  id="country"
                  value={user.country}
                  disabled={isEditable}
                />
              </div>
            </div>
          </article>
        </section>
      </Main>
      <Footer />
    </>
  );
}

export default Profile;
