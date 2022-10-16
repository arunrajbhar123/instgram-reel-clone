import { useState, useEffect, useRef } from "react";
import styles from "./styles.module.css";
import { IoCameraOutline, IoHeartOutline, IoSend } from "react-icons/io5";
import { IoMdMore } from "react-icons/io";
import { TbMessageCircle2 } from "react-icons/tb";
import { IoVolumeMuteOutline, IoVolumeMediumOutline } from "react-icons/io5";
const Player = ({ index, url, liked, message, youLike, name }) => {
  const [play, setPlay] = useState(true);
  const playNow = useRef([]);
  const current = useRef(0);
  useEffect(() => {
    if (playNow.current[0]) {
      playNow.current[current.current].play();
    }
  }, []);

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
    if (play) {
      e.muted = true;
      setPlay(false);
    } else {
      e.muted = false;
      setPlay(true);
    }
  };
  return (
    <div className={styles.frame}>
      <ShowMuteIcon play={play} />
      <IoCameraOutline
        onClick={(e) => handleCamera(e)}
        style={{ position: "fixed", top: "15", right: "15", fontSize: "30" }}
      />
      <div style={PositionOfIcon}>
        <IoHeartOutline />
        <span>{liked}</span>
        <TbMessageCircle2 style={{ transform: "rotate(-100deg)" }} />
        <span>{message}</span>

        <IoSend style={{ transform: "rotate(-30deg)" }} />
        <IoMdMore />
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
            }}
          >
            Follow
          </button>
        </div>
      </div>
      <video
        ref={(element) => {
          playNow.current[index] = element;
        }}
        width="100%"
        height="100%"
        style={{ objectFit: "cover" }}
        loop
        onClick={(e) => handleMute(e.target)}
        onChange={(e) => {
          console.log("hi");
          current.current++;
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
    let clear = setTimeout(() => {
      hidden.current.style.display = "none";
      return () => {
        if (clear) {
          clearTimeout(clear);
        }
      };
    }, 1000);
    hidden.current.style.display = "block";
  }, [play]);

  return (
    <div style={{ ...MuteIcon }} ref={hidden}>
      {!play ? <IoVolumeMuteOutline /> : <IoVolumeMediumOutline />}
    </div>
  );
};

const MuteIcon = {
  position: "absolute",
  top: "45%",
  right: "40%",
  fontSize: "3rem",
};
