import logo from "./logo.svg";
import "./App.css";
import Player from "./components/Player";
import videoURL from "./video/2.mp4";
import { useEffect, useState } from "react";

function App() {
  const data = [
    { name: "Suraj", url: videoURL, liked: 25, message: 25, youLike: true },
    { name: "Arju", url: videoURL, liked: 85, message: 55, youLike: false },
    { name: "Kos", url: videoURL, liked: 65, message: 55, youLike: true },
    { name: "Kea", url: videoURL, liked: 45, message: 85, youLike: false },
  ];
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);

  return (
    <div className="holster">
      <div className="container y mandatory-scroll-snapping" dir="rtl">
        {data?.length &&
          data.map((el, index) => <Player key={index} {...el} index={index} />)}
      </div>
    </div>
  );
}

export default App;
