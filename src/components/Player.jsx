import { useState, useEffect, useRef } from "react";
import styles from "./styles.module.css";
import { IoCameraOutline, IoHeartOutline, IoSend } from "react-icons/io5";
import { IoMdMore } from "react-icons/io";
import { TbMessageCircle2 } from "react-icons/tb";
import { IoVolumeMuteOutline, IoVolumeMediumOutline } from "react-icons/io5";
import { loadData, saveData } from "../utils/localStorage.js";
const Player = ({ index, url, liked, message, youLike, name, run }) => {
  const [play, setPlay] = useState(true);

  const handleCamera = (e) => {
    const constraints = {
      audio: true,
      video: { width: 1280, height: 720 },
    };

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((mediaStream) => {})
      .catch((err) => {
        console.error(`${err.name}: ${err.message}`);
      });
  };

  const handleMute = (e) => {
    if (loadData("play")) {
      saveData("play", false);
      setPlay(false);
      e.muted = false;
    } else {
      saveData("play", true);
      e.muted = true;

      setPlay(true);
    }
  };

  const handleLike = (e) => {};

  return (
    <div className={styles.frame}>
      <ShowMuteIcon play={play} />
      {/* <IoCameraOutline
        onClick={(e) => handleCamera(e)}
        style={{ position: "fixed", top: "15", right: "15", fontSize: "30" }}
      /> */}
      <div style={PositionOfIcon}>
        <IoHeartOutline
          onClick={(e) => handleLike(e)}
          style={{ zIndex: "1" }}
          onPointerOver={(e) => (e.target.style.cursor = "pointer")}
        />
        <span>{liked}</span>
        <TbMessageCircle2
          style={{ transform: "rotate(-100deg)", zIndex: "1" }}
          onPointerOver={(e) => (e.target.style.cursor = "pointer")}
        />
        <span>{message}</span>

        <IoSend
          style={{ transform: "rotate(-30deg)", zIndex: "1" }}
          onPointerOver={(e) => (e.target.style.cursor = "pointer")}
        />
        <IoMdMore
          style={{ zIndex: "1" }}
          onPointerOver={(e) => (e.target.style.cursor = "pointer")}
        />
        <div
          style={{
            background: "red",
            width: "30px",
            height: "30px",
            borderRadius: "5px",
          }}
        ></div>
      </div>
      <div className={styles.Info}>
        <div>
          <div
            style={{
              background: "red",
              width: "30px",
              height: "30px",
              borderRadius: "5px",
            }}
          ></div>
          <div>{name}</div>
          <button
            style={{
              borderRadius: "5px",
              background: "transparent",
              color: "#fff",
              border: "1px solid #fff",
              padding: "4px 10px",
            }}
          >
            Follow
          </button>
        </div>
        <div
          style={{
            padding: "12px 4px",
          }}
        >
          <div className={styles.Visual}>
            <div></div>
            <div></div>
            <div></div>
          </div>

          <div className={styles.songName}>tere liye main tu mera</div>
        </div>
      </div>
      <video
        width="100%"
        height="100%"
        style={{ objectFit: "cover" }}
        loop
       
        onClick={(e) => handleMute(e.target)}
        ref={(element) => {
          // list=(...list);
        }}
      >
        <source src={url} />
      </video>
    </div>
  );
};
export default Player;

const PositionOfIcon = {
  position: "absolute",
  right: "15px",
  bottom: "15px",
  fontSize: "30px",
  display: "grid",
  justifyContent: "center",

  gap: "15px",
  alignItems: "center",
};

const ShowMuteIcon = ({ play }) => {
  const hidden = useRef();
  useEffect(() => {
    hidden.current.style.display = "block";
    let clear = setTimeout(() => {
      if (clear) {
        clearTimeout(clear);
      }
      hidden.current.style.display = "none";
    }, 2000);
  }, [play]);

  return (
    <div style={{ ...MuteIcon }} ref={hidden}>
      {play ? <IoVolumeMuteOutline /> : <IoVolumeMediumOutline />}
    </div>
  );
};

const MuteIcon = {
  position: "absolute",
  top: "45%",
  right: "40%",
  padding: "15px",
  fontSize: "2rem",
  background: "grey",
  borderRadius: "3rem",
  width: "4rem",
  height: "4rem",
  display: "flex",
  alignItems: "center",
};
