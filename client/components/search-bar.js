import React, { useState } from "react";
import SearchIcon from "../public/search-icon.png";
import Image from "next/image";
import styles from "../styles/search-bar.module.scss";
const SearchBar = ({ handleChange }) => {
  const [search, setSearch] = useState("");

  return (
    <div className={styles.searchBar}>
      <div className={styles.image}>
        <Image src={SearchIcon} width={20} height={20} />
      </div>
      <input
        type="text"
        onChange={(e) => {
          setSearch(e.target.value);
          handleChange(e);
        }}
        value={search}
      />
    </div>
  );
};

export default SearchBar;
