import React, { useState } from "react";
import { AnimeStatus } from "@devion/common";
import styles from "../styles/animelist.module.scss";

import AnimeListContainer from "../components/anime-list-container";
const AnimeList = ({ data, currenUser }) => {
  const [animeData, setAnimeData] = useState(data);

  const handleClick = (e, filterType) => {
    e.preventDefault();

    if (filterType === "all") {
      setAnimeData(data);
    } else {
      setAnimeData(data.filter((anime) => anime.status === filterType));
    }
  };

  return currenUser ? (
    <>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>
              <button
                className={styles.button}
                onClick={(e) => handleClick(e, "all")}
              >
                All
              </button>
            </th>
            <th>
              <button
                className={styles.button}
                onClick={(e) => handleClick(e, AnimeStatus.Watching)}
              >
                Currently Watching
              </button>
            </th>
            <th>
              <button
                className={styles.button}
                onClick={(e) => handleClick(e, AnimeStatus.Completed)}
              >
                Completed
              </button>
            </th>
            <th>
              <button
                className={styles.button}
                onClick={(e) => handleClick(e, AnimeStatus.OnHold)}
              >
                On Hold
              </button>
            </th>
            <th>
              <button
                className={styles.button}
                onClick={(e) => handleClick(e, AnimeStatus.Dropped)}
              >
                Dropped
              </button>
            </th>
            <th>
              <button
                className={styles.button}
                onClick={(e) => handleClick(e, AnimeStatus.PlanToWatch)}
              >
                Plan to Watch
              </button>
            </th>
          </tr>
        </thead>
      </table>
      <AnimeListContainer data={animeData} />
    </>
  ) : (
    <h1
      style={{
        color: "white",
        margin: "20% 45%",
        textAlign: "center",
        fontSize: "3rem",
      }}
    >
      Please Sign In
    </h1>
  );
};

AnimeList.getInitialProps = async (context, client, currentUser) => {
  try {
    const { data } = await client.get("/api/profile/animes/all");
    console.log(data);
    return { data: data };
  } catch (e) {
    console.log(e);
    return { data: undefined };
  }
};

export default AnimeList;
