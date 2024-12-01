import { useState } from "react";
import styles from "./AuthPage.module.css";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

import { Footer } from "./../../components";

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin((is) => !is);
  };

  return (
    <>
      <main className={styles.authPage}>
        <section className={styles.authForm}>
          <article className={styles.article}>
            <img
              src="./logo.png"
              alt="Order.UK logo"
              className={styles.formLogo}
            />
            <div className={styles.welcome}>
              <h1>{isLogin ? "Welcome back 👋" : "Welcome 👋"}</h1>
              <p>
                Today is a new day. It&apos;s your day. You shape it. Sign in to
                start ordering.
              </p>
            </div>
            {isLogin ? <Login /> : <SignUp />}
            <p className={styles.toggleForm}>
              {isLogin
                ? "Don't you have an account?"
                : "Already have an account?"}{" "}
              <button onClick={toggleForm} className={styles.toggleButton}>
                {isLogin ? "Sign up" : "Sign in"}
              </button>
            </p>
          </article>
        </section>
        <section
          className={styles.mainImage}
          aria-label="Juicy burger with crispy golden fries"
        ></section>
      </main>
      <Footer />
    </>
  );
}

export default AuthPage;
