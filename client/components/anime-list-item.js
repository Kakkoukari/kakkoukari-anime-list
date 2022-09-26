import React, { useRequest, useEffect } from "react";
import Image from "next/image";
import styles from "../styles/home.module.scss";
import TestImage from "../public/test-image.png";
import Link from "next/link";

const AnimeListItem = ({
  animeTitle,
  animeSynopsis,
  animeNumberOfEpisodes,
  animeRating,
  animeGenres,
  animeImage,
}) => {
  return (
    <div className={styles.listItem}>
      <div className={styles.image}>
        <Link href="#">
          <a>
            {!animeImage ? (
              <Image src={TestImage} width={100} height={100} />
            ) : (
              <Image src={animeImage} width={100} height={100} />
            )}
          </a>
        </Link>
      </div>
      <div className={styles.info}>
        <div className={styles.title}>
          <Link href="#">
            <a>{!animeTitle ? <h2>THE ANIME</h2> : <h2>{animeTitle}</h2>}</a>
          </Link>
        </div>
        <div className={styles.description}>
          <div>
            <h4>Number Of Episodes: </h4>
            {!animeNumberOfEpisodes ? (
              <span>69</span>
            ) : (
              <span>{animeNumberOfEpisodes}</span>
            )}
          </div>
          <div>
            <h4>Rating: </h4>
            {!animeRating ? <span>6.9</span> : <span>{animeRating}</span>}
          </div>
          <div>
            <h4>Genres: </h4>
            {!animeGenres ? (
              <span>Genre Genre Genre Genre</span>
            ) : (
              animeGenres.map((genre) => {
                return <span>{genre.name}</span>;
              })
            )}
          </div>
        </div>
      </div>
      <div className={styles.synopsis}>
        <h2>Synopsis</h2>
        {!animeSynopsis ? (
          <p>
            Sorry Couldn't Load The anime synopsis data. We apologize for server
            error! Please Refresh The Page or Kindly Fuck Off!
          </p>
        ) : (
          <p>{animeSynopsis}</p>
        )}
      </div>
    </div>
  );
};

export default AnimeListItem;
