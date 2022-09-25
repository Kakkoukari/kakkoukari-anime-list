import { useState } from "react";
import styles from "../styles/signup.module.scss";
import { Router } from "next/router";
import { useRequest } from "../hooks/use-request";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { doRequest, errors } = useRequest({
    url: "/api/users/signin",
    method: "post",
    body: {
      email,
      username,
      password,
    },
    onSuccess: () => {
      Router.push("/");
    },
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    doRequest();
  };

  return (
    <div id={`${styles.loginform}`}>
      <h2 id={`${styles.headerTitle}`}>Login</h2>
      <div>
        <div className={`${styles.row}`}>
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className={`${styles.row}`}>
          <label>Username</label>
          <input
            type="text"
            placeholder="Enter your Username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <div className={`${styles.row}`}>
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        {errors}
        <div id={`${styles.button}`} className={`${styles.row}`}>
          <button onSubmit={onSubmit}>Login</button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
