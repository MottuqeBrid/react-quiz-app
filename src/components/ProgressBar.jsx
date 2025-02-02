import { Link } from "react-router";
import classes from "../styles/Progress.module.css";
import Button from "./Button";
import { useRef, useState } from "react";

// eslint-disable-next-line react/prop-types
const ProgressBar = ({ pre, next, progressPercent, submit }) => {
  const tooltipref = useRef();
  const [tooltip, setTooltip] = useState(false);
  function toggletooltip() {
    if (tooltip) {
      setTooltip(false);
      tooltipref.current.style.display = "none";
    } else {
      setTooltip(true);
      tooltipref.current.style.left = `calc(${progressPercent}% - 65px)`;
      tooltipref.current.style.display = "block";
    }
  }
  return (
    <div className={classes.progressBar}>
      <Button onClick={pre} className={classes.backButton}>
        <span className="material-icons-outlined"> arrow_back </span>
      </Button>
      <div className={classes.rangeArea}>
        <div className={classes.tooltip} ref={tooltipref}>
          {progressPercent}% Complete!
        </div>
        <div className={classes.rangeBody}>
          <div
            onMouseOver={toggletooltip}
            onMouseOut={toggletooltip}
            className={classes.progress}
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>
      {/* <Link to="/result"> */}
      <Button
        className={classes.next}
        onClick={progressPercent === 100 ? submit : next}
      >
        <div className="button next">
          {progressPercent === 100 ? (
            <span>Submit Quiz</span>
          ) : (
            <span>Next Question</span>
          )}
          <span className="material-icons-outlined"> arrow_forward </span>
        </div>
      </Button>
      {/* </Link> */}
    </div>
  );
};

export default ProgressBar;
