import React, { useEffect, useState } from "react";
import styles from "../styles/home.module.scss";
import AnimeListItem from "./anime-list-item";
import useRequest from "../hooks/use-request";
const AnimeListContainer = () => {
  /*Uncomment when testing on skaffold*/
  //   const [animeList, setAnimeList] = useState([]);
  //   const { doRequest, errors } = useRequest({
  //     url: "/api/animes",
  //     method: "get",
  //     body: {},
  //     onSuccess: (data) => {
  //       console.log(data);
  //       setAnimeList(data);
  //     },
  //   });
  //     useEffect(() => {
  //       doRequest();
  //     }, []);
  return (
    <div className={styles.listContainer}>
      <AnimeListItem />
      <AnimeListItem />
      <AnimeListItem />
    </div>
  );
};

export default AnimeListContainer;
