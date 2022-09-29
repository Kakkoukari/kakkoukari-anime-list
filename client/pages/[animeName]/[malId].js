import React from "react";
import styles from "../../styles/animepage.module.scss";
import AnimeImage from "../../public/test-image.png";
import Image from "next/image";
import { AnimeStatus } from "@devion/common";
const AnimePage = ({ params, currentUser }) => {
  const handleSubmit = async (e) => {};
  const postComment = async (e) => {};
  return (
    <div className={styles.profileContainer}>
      <div className={styles.topContainer}>
        <div class={styles.image}>
          <div className={styles.imageInner}>
            <Image src={AnimeImage} width={350} height={350} />
          </div>
        </div>
        <div class={styles.content}>
          <div class={styles.title}>
            <h1>Anime Title: {params.animeName}</h1>
          </div>
          <div className={styles.header}>
            <h3>Anime Type: </h3>
            <span>Tv</span>
          </div>
          <div className={styles.header}>
            <h3>Rating: </h3>
            <span> 6/10</span>
          </div>
          <div className={styles.header}>
            <h3>Duration: </h3>
            <span>06 July 2022-07 August 2022</span>
          </div>
          <div className={styles.header}>
            <h3>Number Of Episodes: </h3>
            <span>12</span>
          </div>
          <div className={styles.header}>
            <h3> Genre: </h3>
            <span>Action Adventure Romance</span>
          </div>
          <div className={styles.synopsis}>
            <h1>Synopsis</h1>
            <p>
              saflasnflnaslfknalskfnlasnflasknflasnf;asflaksnflasnflasnflaksnflaknslfkanslfknaslkfnalsknfalskfnalsowijad
              alsgnaosngioangioansgoiajsoigjawgnwiangnaiogjoasgoasijaosijfasifoiasjioajoiaosijaosijsaoijgoaigjaosigjasoi
              alsgnaosngioangioansgoiajsoigjawgnwiangnaiogjoasgoasijaosijfasifoiasjioajoiaosijaosijsaoijgoaigjaosigjasosafaafmsalmlkasmglkasmglkasmgaslkglasmlagmslgamsmlgmslakmlgasmglakmgakmsl
              alsgnaosngioangioansgoiajsoigjawgnwiangnaiogjoasgoasijaosijfasifoiasjioajoiaosijaosijsaoijgoaigjaosigjasoi
            </p>
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
      <div className={styles.commentContainer}>
        <h1>Add Comment</h1>
        <form onSubmit={postComment}>
          <textarea
            id="comment"
            name="comment"
            rows="5"
            cols="100"
            placeholder="Write Your Comment Here"
          ></textarea>
          <button type="submit" className={styles.subButton}>
            Comment
          </button>
        </form>
      </div>
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
