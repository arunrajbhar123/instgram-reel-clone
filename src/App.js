import logo from "./logo.svg";
import "./App.css";
import Player from "./components/Player";
import videoURL from "./video/2.mp4";
import { useEffect, useState, useRef } from "react";
import { loadData, saveData } from "./utils/localStorage";
import axios from "axios";
function App() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    axios
      .get("https://server-arunrajbhar.vercel.app/")
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
        setIsError(false);
      })
      .catch((err) => {
        setIsError(true);
      });
  }, []);
  console.log(data);
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);

  const [run, setRun] = useState(0);

  useEffect(() => {
    function videoScroll() {
      let dsa = document.querySelectorAll(".container video");

      if (dsa?.length > 0) {
        var windowHeight = window.innerHeight,
          videoEl = dsa;

        for (var i = 0; i < videoEl.length; i++) {
          var thisVideoEl = videoEl[i];

          var videoHeight = thisVideoEl.clientHeight;

          var videoClientRect = thisVideoEl.getBoundingClientRect().top;

          if (
            videoClientRect <= windowHeight - videoHeight * 0.5 &&
            videoClientRect >= 0 - videoHeight * 0.5
          ) {
            if (loadData("play")) {
              thisVideoEl.muted = true;
              thisVideoEl?.play();
            } else {
              thisVideoEl.muted = false;
              thisVideoEl?.play();
            }
          } else {
            thisVideoEl?.pause();
            thisVideoEl.currentTime = 0;
          }
        }
      }
    }
    setTimeout(() => {
      videoScroll();
    }, 1000);
    // saveData("play", true);
  }, [run]);

  return (
    <div className="holster">
      <div
        className="container y mandatory-scroll-snapping"
        dir="rtl"
        onScroll={(e) => setRun(run + 1)}
      >
        {data?.length &&
          data.map((el, index) => (
            <Player key={index} {...el} index={index} run={run}
            isLoading={isLoading} isError={isError}
            />
          ))}
      </div>
    </div>
  );
}

export default App;
