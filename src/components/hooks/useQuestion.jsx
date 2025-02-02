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

const useQuestion = (videoID) => {
  // console.log(page);
  const [loading, setLoading] = useState(true);
  const [error, setEror] = useState(false);
  const [quesions, setQuestions] = useState([]);
  useEffect(() => {
    async function fatchQuestion() {
      // database related work
      const db = getDatabase();
      const quizRef = ref(db, "quiz/" + videoID + "/questions");
      const quizquery = query(quizRef, orderByKey());
      try {
        setEror(false);
        setLoading(true);
        // request firebase work
        const snapshort = await get(quizquery);
        setLoading(false);
        if (snapshort.exists()) {
          setQuestions((prequiz) => {
            // return [...prequiz, ...Object.values(snapshort.val())];
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
    fatchQuestion();
  }, [videoID]);

  return {
    loading,
    error,
    quesions,
  };
};

export default useQuestion;
