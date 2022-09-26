import React, { useState } from "react";
import axios from "axios";
import styles from "../styles/profile.module.scss";
import useRequest from "../hooks/use-request";

const Profile = ({ currentUser }) => {
  const [profilepic, setProfilepic] = useState(null);
  const [profilepicUrl, setProfilepicUrl] = useState(null);

  const { doRequest, errors } = useRequest({
    url: "/api/users/update",
    method: "put",
    body: {
      profilepic: profilepicUrl,
    },
    onSuccess: () => Router.push("/"),
  });

  const onSubmit = (e) => {
    e.preventDefault();

    try {
      const imageKitResponse = axios({
        url: "https://upload.imagekit.io/api/v1/files/upload",
        method: "post",
        body: {
          file: profilepic,
          publicKey: "public_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
          signature: "signature_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
          expire: "expire_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
          fileName: "fileName_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
          useUniqueFileName: true,
        },
      });

      setProfilepicUrl(imageKitResponse.url);
    } catch (err) {
      console.log(err);
    }

    // doRequest();
  };

  return currentUser ? (
    <div className={`${styles.card}`} data-state="#about">
      <div className={`${styles.cardheader}`}>
        <div className={`${styles.cardcover}`}></div>
        <img
          className={`${styles.cardavatar}`}
          src={
            currentUser.profilepic ||
            "https://i.pinimg.com/236x/28/2f/81/282f81f5de984104a9227583b39df527.jpg"
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
        <div className={`${styles.carddesc} ${styles.cardcontent}`}>
          <button className={`${styles.button}`}>Edit Profile Picture</button>

          <button className={`${styles.button}`} onSubmit={onSubmit}>
            Submit
          </button>
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
