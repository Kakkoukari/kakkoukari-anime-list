import React from "react";
import styles from "../styles/navbar.module.scss";
import Link from "next/link";
const NavBar = ({ currentUser }) => (
  <header className={styles.navbar}>
    <div className={`${styles.navbar__item} ${styles.navbar__title} `}>KAL</div>
    <div className={`${styles.navbar__item} ${styles.navbar__link}`}>
      {currentUser ? (
        <Link href="#">
          <a>MyList</a>
        </Link>
      ) : (
        <Link href="#">
          <a>SignUp</a>
        </Link>
      )}
    </div>
    <div className={`${styles.navbar__item} ${styles.navbar__link}`}>
      {currentUser ? (
        <Link href="#">
          <a>Profile</a>
        </Link>
      ) : (
        <Link href="#">
          <a>SignIn</a>
        </Link>
      )}
    </div>
    <div className={`${styles.navbar__item} ${styles.navbar__link}`}>
      <Link href="#">
        <a>AboutUs</a>
      </Link>
    </div>
  </header>
);

export default NavBar;
