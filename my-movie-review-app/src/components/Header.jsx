import React from "react";
import '../App.css';
import logo from '../assets/logo.png';

function Header() {
  return (
    <header className="headerSection">
      <img
        src={logo}
        alt="ReelSense"
        className="logo"
      />
      <p className="headerDescription"> 
        Wanna know if a movie's a feel-good hit or a total buzzkill? We got you.
        <br />
        <br />
        Drop a movie review link here – we'll read it, sum up the buzz, and rate it from 1 to 5 stars!
      </p>
    </header>
  );
}

export default Header;