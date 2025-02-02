import {
  get,
  getDatabase,
  limitToFirst,
  orderByKey,
  query,
  ref,
  startAt,
} from "firebase/database";
import { useEffect, useState } from "react";

const useAnswers = (videoID) => {
  // console.log(page);
  const [loading, setLoading] = useState(true);
  const [error, setEror] = useState(false);
  const [answers, setAnswers] = useState([]);
  useEffect(() => {
    async function fatchAnswers() {
      // database related work
      const db = getDatabase();
      const answerRef = ref(db, "answers/" + videoID + "/questions");
      const answerquery = query(answerRef, orderByKey());
      try {
        setEror(false);
        setLoading(true);
        // request firebase work
        const snapshort = await get(answerquery);
        setLoading(false);
        if (snapshort.exists()) {
          setAnswers((preans) => {
            // return [...preans, ...Object.values(snapshort.val())];
            return [...Object.values(snapshort.val())];
          });
          // console.log(videos);
        }
      } catch (e) {
        console.log(e);
        setLoading(false);
        setEror(true);
      }
    }
    fatchAnswers();
  }, [videoID]);

  return {
    loading,
    error,
    answers,
  };
};

export default useAnswers;
