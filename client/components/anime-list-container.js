import React, { useEffect, useState } from "react";
import styles from "../styles/home.module.scss";
import AnimeListItem from "./anime-list-item";
import useRequest from "../hooks/use-request";
import SearchBar from "./search-bar";
const AnimeListContainer = () => {
  /*Uncomment when testing on skaffold*/
  //  Use obtainedAnimes to store the data retrieved
  //   const { doRequest, errors } = useRequest({
  //     url: "/api/animes",
  //     method: "get",
  //     body: {},
  //     onSuccess: (data) => {
  //       console.log(data);
  //       setObtainedAnimes(data);
  //     },
  //   });
  //     useEffect(() => {
  //       doRequest();
  //     }, []);
  const [search, setSearch] = useState("");
  const [obtainedAnimes, setObtainedAnimes] = useState([
    {
      titles: [
        { type: "English", title: "DragonRaja" },
        { type: "Japanese", title: "Lu Shanshag" },
      ],
      type: "TV",
      synopsis:
        "Another day, another bounty—such is the life of the often unlucky crew of the Bebop. However, this routine is interrupted when Faye, who is chasing a fairly worthless target on Mars, witnesses an oil tanker suddenly explode, causing mass hysteria. As casualties mount due to a strange disease spreading through the smoke from the blast, a whopping three hundred million woolong price is placed on the head of the supposed perpetrator. With lives at stake and a solution to their money problems in sight, the Bebop crew springs into action. Spike, Jet, Faye, and Edward, followed closely by Ein, split up to pursue different leads across Alba City. Through their individual investigations, they discover a cover-up scheme involving a pharmaceutical company, revealing a plot that reaches much further than the ragtag team of bounty hunters could have realized. [Written by MAL Rewrite]",
      epsiodes: 12,
      rating: 8.5,
      genres: [
        {
          name: "Action",
        },
        { name: "Adventure" },
      ],
      images: ["https://cdn.myanimelist.net/images/anime/4/19644.jpg"],
      malId: 1,
    },
    {
      titles: [
        { type: "English", title: "AsagonMaid" },
        { type: "Japanese", title: "KETp" },
      ],
      type: "TV",
      synopsis: "A story about a dragon",
      epsiodes: 16,
      rating: 4.5,
      genres: [
        {
          name: "Action",
        },
        { name: "Adventure" },
        { name: "Romance" },
      ],
      images: ["https://cdn.myanimelist.net/images/anime/4/19644.jpg"],
      malId: 2,
    },
  ]);
  const [animeNameTitles, setAnimeNameTitles] = useState(obtainedAnimes);
  const handleChange = (e) => {
    setSearch(e.target.value);
    console.log(e.target.value);
    setAnimeNameTitles(
      obtainedAnimes.filter((obtainedAnime) => {
        return (
          obtainedAnime.titles[0].title
            .toLowerCase()
            .includes(e.target.value.toLowerCase()) || //English
          obtainedAnime.titles[1].title
            .toLowerCase()
            .includes(e.target.value.toLowerCase()) //Japanese
        );
      })
    );
    console.log(animeNameTitles);
  };
  useEffect(() => {
    if (search.length === 0) {
      setAnimeNameTitles(obtainedAnimes);
    }
  });
  return (
    <div className={styles.listContainer}>
      <div className={styles.searchBar}>
        <SearchBar handleChange={handleChange} />
      </div>
      {animeNameTitles.map((anime, index) => {
        return (
          <AnimeListItem
            animeTitles={anime.titles}
            animeSynopsis={anime.synopsis}
            animeNumberOfEpisodes={anime.epsiodes}
            animeRating={anime.rating}
            animeGenres={anime.genres}
            animeMalId={anime.malId}
            animeImage={anime.images[0]}
            key={index}
          />
        );
      })}
    </div>
  );
};

export default AnimeListContainer;
