import React from "react";
import { useState } from "react";
import styles from "../styles/profile.module.scss";

const Profile = ({ currentUser }) => {
  return currentUser ? (
    <div className={`${styles.card}`} data-state="#about">
      <div className={`${styles.cardheader}`}>
        <div className={`${styles.cardcover}`}></div>
        <img
          className={`${styles.cardavatar}`}
          src={
            currentUser.profilepic ||
            "https://png.pngtree.com/png-vector/20210604/ourmid/pngtree-gray-avatar-placeholder-png-image_3416697.jpg"
          }
          alt="avatar"
        />
        <h1 className={`${styles.cardfullname}`}>{currentUser.username}</h1>
      </div>
      <div className={`${styles.cardmain}`}>
        <div
          className={`${styles.cardsection} ${styles.isactive}`}
          id={`${styles.about}`}
        >
          <div className={`${styles.cardcontent}`}>
            <div className={`${styles.cardsubtitle}`}>Email</div>
            <p className={`${styles.carddesc}`}>{currentUser.email}</p>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className={`${styles.card}`} data-state="#about">
      <div className={`${styles.cardheader}`}>
        <h1 className={`${styles.cardfullname}`}>Please Sign In</h1>
      </div>
    </div>
  );
};

export default Profile;
