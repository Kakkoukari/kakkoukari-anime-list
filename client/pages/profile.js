import React, { useState, useRef, useEffect } from "react";
import styles from "../styles/profile.module.scss";
import useRequest from "../hooks/use-request";

const Profile = ({ currentUser }) => {
  const fileRef = useRef(null);

  const [profilepic, setProfilepic] = useState("");
  const [profilepicUrl, setProfilepicUrl] = useState(null);

  const { doRequest, errors } = useRequest({
    url: "/api/profile/update",
    method: "put",
    body: {
      profilepic: profilepicUrl,
    },
    onSuccess: () => Router.push("/"),
  });

  const { doRequest: doRequest2, errors: errors2 } = useRequest({
    url: "/api/profile/imagekit",
    method: "post",
    body: {
      profilepic: profilepic,
    },
    onSuccess: (data) => {
      console.log("data:  ", data);
      setProfilepicUrl(data.url);
    },
  });

  const handleFileChange = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setProfilepic(readerEvent.target.result);
    };
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    await doRequest2().then(async () => {
      console.log("ok");
      await doRequest();
    });
  };

  useEffect(() => {
    if (currentUser?.profilepic) setProfilepic(currentUser.profilepic);
  }, [currentUser]);

  return currentUser ? (
    <div className={`${styles.card}`} data-state="#about">
      <div className={`${styles.cardheader}`}>
        <div className={`${styles.cardcover}`}></div>
        <img
          className={`${styles.cardavatar}`}
          src={
            profilepic ||
            "https://i.pinimg.com/236x/28/2f/81/282f81f5de984104a9227583b39df527.jpg"
          }
          onClick={() => fileRef.current.click()}
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
          <form onSubmit={onSubmit}>
            <input
              type="file"
              ref={fileRef}
              hidden
              onChange={handleFileChange}
            />
            <button
              className={`${styles.button}`}
              onClick={() => fileRef.current.click()}
            >
              Edit Profile Picture
            </button>

            <button
              type="submit"
              className={`${styles.button}`}
              onSubmit={onSubmit}
            >
              Submit
            </button>
          </form>
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
