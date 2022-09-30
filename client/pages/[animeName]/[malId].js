import React, { useState, useEffect } from "react";
import styles from "../../styles/animepage.module.scss";
import AnimeImage from "../../public/test-image.png";
import Image from "next/image";
import { AnimeStatus } from "@devion/common";
import CommentListContainer from "../../components/comment-list-container";
import useRequest from "../../hooks/use-request";
const AnimePage = ({ params, currentUser }) => {
  const [titles, setTitles] = useState("");
  const [duration, setDuration] = useState("");
  const [type, setType] = useState("");
  const [rating, setRating] = useState("");
  const [episodes, setEpisodes] = useState("");
  const [genre, setGenre] = useState();
  const [synopsis, setSynopsis] = useState("");
  const [animeId, setAnimeId] = useState("");
  const [images, setImages] = useState();
  const [score, setScore] = useState();
  const [comments, setComments] = useState();
  const [status, setStatusAnime] = useState("");
  const request2 = useRequest({
    url: `/api/profile/update`,
    method: "put",
    body: {
      animeUpdate: {
        anime: {
          titles: titles,
          type: type,
          malId: params.malId,
          images: images,
          episodes: episodes,
          duration: duration,
          score: score,
          synopsis: synopsis,
          genres: genre,
          comments: comments,
        },
        animeId: params.malId,
        status: status,
      },
    },
    onSuccess: (data) => {
      console.log(data);
    },
  });
  const { doRequest, errors } = useRequest({
    url: `/api/animes/new/${params.malId}`,
    method: "get",
    body: {},
    onSuccess: (data) => {
      console.log(data);
      setTitles(data.titles);
      setDuration(data.duration);
      setType(data.type);
      setRating(data.rating);
      setEpisodes(data.episodes);
      setGenre(data.genre);
      setSynopsis(data.synopsis);
      setAnimeId(data.id);
      setScore(data.score);
      setComments(data.comments);
      setImages(data.images);
    },
  });
  useEffect(() => {
    doRequest();
  }, []);
  useEffect(() => {
    request2.doRequest();
  }, [status]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const select = e.target.status;
    const selectedStatus = select.options[select.selectedIndex].value;
    setStatusAnime(selectedStatus);
  };
  return (
    <div className={styles.profileContainer}>
      <div className={styles.topContainer}>
        <div class={styles.image}>
          <div className={styles.imageInner}>
            {!images ? (
              <Image src={AnimeImage} width={350} height={350} />
            ) : (
              <>
                <img src={images[0]} />
              </>
            )}
          </div>
        </div>
        <div class={styles.content}>
          <div class={styles.title}>
            <h1>Anime Title: {params.animeName}</h1>
          </div>
          <div className={styles.header}>
            <h3>Anime Type: </h3>
            <span>{type ? type : <>Sorry could not get Type</>}</span>
          </div>
          <div className={styles.header}>
            <h3>Rating: </h3>
            <span> {rating ? rating : <>Sorry could not get Rating</>}</span>
          </div>
          <div className={styles.header}>
            <h3>Duration: </h3>
            <span>
              {duration ? duration : <>Sorry could not get Duration</>}
            </span>
          </div>
          <div className={styles.header}>
            <h3>Number Of Episodes: </h3>
            <span>
              {episodes ? episodes : <>Sorry could not get Episodes</>}
            </span>
          </div>
          <div className={styles.header}>
            <h3> Genre: </h3>
            <span>
              {genre ? (
                genre.map(() => {
                  return <span>genre.name </span>;
                })
              ) : (
                <>Sorry Could not get genres</>
              )}
            </span>
          </div>
          <div className={styles.synopsis}>
            <h1>Synopsis</h1>
            <p>{synopsis ? synopsis : <>Sorry could not get Synopsis</>}</p>
          </div>
          <div className={styles.watchButton}>
            <form onSubmit={handleSubmit}>
              <h3>Want to add to your list? </h3>
              <select name="status" id="anime">
                <option value={AnimeStatus.PlanToWatch}>Plan to Watch</option>
                <option value={AnimeStatus.Watching}>Watching</option>
                <option value={AnimeStatus.Dropped}>Dropped</option>
                <option value={AnimeStatus.Completed}>Completed</option>
              </select>
              <button type="submit" className={styles.subButton}>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
      {currentUser ? (
        <div className={styles.commentContainer}>
          <CommentListContainer animeId={animeId} malId={malId} />
        </div>
      ) : (
        <div className={styles.signIn}>
          <h2>Sign In To Add Comments</h2>
        </div>
      )}
    </div>
  );
};
export default AnimePage;
export async function getStaticProps(context) {
  const { params } = context;
  return {
    props: {
      params,
    },
  };
}

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};
