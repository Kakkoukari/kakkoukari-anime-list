import React, { useState, useRef, useEffect } from "react";
import styles from "../styles/profile.module.scss";

const AnimeList = ({ currentUser }) => {
  //   create a list of animes similar to MyAnimeList

  return (
    <>
      <div className={styles.container}>
        <h1>My Anime List</h1>
      </div>
      <div>
        <table>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Score</th>
            <th>Type</th>
            <th>Status</th>
            <th>Episodes Watched</th>
            <th>User Rating</th>
          </tr>
          <tr>
            <td>Image</td>
            <td>Title</td>
            <td>Score</td>
            <td>Type</td>
            <td>Status</td>

            <td>Episodes Watched</td>
            <td>User Rating</td>
          </tr>
        </table>
      </div>

      <div>
        <form>
          <label htmlFor="title">Title</label>
          <input type="text" name="title" id="title" />
          <label htmlFor="score">Score</label>
          <input type="number" name="score" id="score" />
          <label htmlFor="type">Type</label>
          <input type="text" name="type" id="type" />
          <label htmlFor="status">Status</label>
          <input type="text" name="status" id="status" />
          <label htmlFor="episodes">Episodes Watched</label>
          <input type="number" name="episodes" id="episodes" />
          <label htmlFor="rating">Rating</label>
          <input type="number" name="rating" id="rating" />
          <button type="submit">Add Anime</button>
        </form>
      </div>
    </>
  );
};

export default AnimeList;
