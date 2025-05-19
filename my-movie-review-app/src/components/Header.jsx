import React from "react";
import styles from "../App.css"; 

function Header() {
  return (
    <header className={styles.headerSection}>
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/8fa7525c80fedf8b75d84f61ca82db8544b3923b"
        alt="ReelSense"
        className={styles.logo}
      />
      <p className={styles.headerDescription}>
        Wanna know if a movie's a feel-good hit or a total buzzkill? We got you.
        <br />
        <br />
        Drop a movie review link here – we'll read it, sum up the buzz, and rate it from 1 to 5 stars!
      </p>
    </header>
  );
}

export default Header;
