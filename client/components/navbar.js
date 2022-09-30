import React from "react";
import styles from "../styles/navbar.module.scss";
import Link from "next/link";
import Router from "next/router";
const NavBar = ({ currentUser }) => (
  <header className={styles.navbar}>
    <div className={`${styles.navbar__item} ${styles.navbar__title} `}>
      <a href="/">KAL</a>
    </div>
    <div className={`${styles.navbar__item} ${styles.navbar__link}`}>
      {currentUser ? (
        <Link href="/animelist">
          <a>MyList</a>
        </Link>
      ) : (
        <Link href="/signup">
          <a>SignUp</a>
        </Link>
      )}
    </div>
    <div className={`${styles.navbar__item} ${styles.navbar__link}`}>
      {currentUser ? (
        <Link href="aboutus">
          <a>AboutUs</a>
        </Link>
      ) : (
        <Link href="/login">
          <a>SignIn</a>
        </Link>
      )}
    </div>
    <div className={`${styles.navbar__item} ${styles.navbar__link}`}>
      <Link href="/profile">
        <img
          src={
            currentUser?.profilepic ||
            "https://png.pngtree.com/png-vector/20210604/ourmid/pngtree-gray-avatar-placeholder-png-image_3416697.jpg"
          }
          height="35px"
          style={{ borderRadius: "50%" }}
          alt=""
        />
      </Link>
    </div>
  </header>
);

export default NavBar;
