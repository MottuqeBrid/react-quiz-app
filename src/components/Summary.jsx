import { useMemo } from "react";
import successimage from "../assets/images/success.png";
import style from "../styles/Summary.module.css";
import useFatch from "./hooks/useFatch";

const Summary = ({ score, noq }) => {
  const getKeyword = useMemo(() => {
    if ((score / noq) * 100 < 50) {
      return "failed";
    } else if ((score / noq) * 100 < 75) {
      return "good";
    } else if ((score / noq) * 100 < 100) {
      return "very good";
    } else {
      return "excellent";
    }
  }, [score, noq]);
  const { loading, error, result } = useFatch(
    `https://api.pexels.com/v1/search?query=${getKeyword}&per_page=1`,
    "GET",
    {
      Authorization: import.meta.env.VITE_REACT_APP_PEXELS_API,
    }
  );
  const image = result ? result?.photos[0].src.medium : successimage;
  // console.log(image);
  return (
    <div className={style.summary}>
      <div className={style.point}>
        <p className={style.score}>
          Your score is <br />
          {score} out of {noq}
        </p>
      </div>
      {loading && <div className={style.badge}>Loading your Badge...</div>}
      {error && <div>There was an error!</div>}
      {!loading && !error && (
        <div className={style.badge}>
          <img src={image} alt="Success" />
        </div>
      )}
    </div>
  );
};

export default Summary;
