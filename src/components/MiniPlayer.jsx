import React, { useRef, useState } from "react";
import image from "../assets/images/3.jpg";
import classes from "../styles/MiniPlayer.module.css";
import ReactPlayer from "react-player/youtube";
import { useLocation } from "react-router";

const MiniPlayer = ({ vid }) => {
  const buttinref = useRef();
  const [states, setStates] = useState(false);
  const location = useLocation();
  const { state } = location;
  // console.log(state.title);

  const videourl = `https://www.youtube.com/watch?v=${vid}`;

  function toggleminiplayer() {
    if (!states) {
      buttinref.current.classList.remove(classes.floatingBtn);
      setStates(true);
    } else {
      buttinref.current.classList.add(classes.floatingBtn);
      setStates(false);
    }
  }
  return (
    <div
      className={`${classes.miniPlayer} ${classes.floatingBtn}`}
      ref={buttinref}
      onClick={toggleminiplayer}
    >
      <span className={`material-icons-outlined ${classes.open}`}>
        {" "}
        play_circle_filled{" "}
      </span>
      <span
        className={`material-icons-outlined ${classes.close}`}
        onClick={toggleminiplayer}
      >
        {" "}
        close{" "}
      </span>
      {/* <img src={image} alt="" /> */}
      <ReactPlayer
        className={classes.player}
        url={videourl}
        width="300px"
        height="168px"
        playing={states}
        controls={!states}
      />
      <p>{state.title}</p>
    </div>
  );
};

export default MiniPlayer;
