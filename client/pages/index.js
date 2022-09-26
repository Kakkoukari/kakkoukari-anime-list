import Head from "next/head";
import Image from "next/image";

import AnimeListContainer from "../components/anime-list-container";
const Home = ({ data }) => {
  return <AnimeListContainer data={data} />;
};

Home.getInitialProps = async (context, client, currentUser) => {
  try {
    const { data } = await client.get("/api/animes/new");
    console.log(data);
    return { data: data };
  } catch (e) {
    console.log(e);
    return { data: undefined };
  }
};
export default Home;
