import React, { useEffect, useReducer, useState } from "react";
import Answers from "../Answers";
import MiniPlayer from "../MiniPlayer";
import ProgressBar from "../ProgressBar";
import { useNavigate, useParams } from "react-router";
import useQuestion from "../hooks/useQuestion";
import _ from "lodash";
import { useAuth } from "../../AuthContext";
import { getDatabase, ref, set } from "firebase/database";
// import { _ } from "react-lodash";
// import { cloneDeep } from "react-lodash";

const Quiz = () => {
  const { id } = useParams();
  const { loading, error, quesions } = useQuestion(id);
  const [currentQuestion, setCarrentQuestion] = useState(0);
  const initialState = null;
  const { currentUser, signup, login, logout } = useAuth();
  const navigate = useNavigate();
  const reducer = (state, action) => {
    switch (action.type) {
      case "questions":
        action.value.forEach((question) => {
          question.options.forEach((option) => {
            option.checked = false;
          });
        });
        return action.value;
      case "answer": {
        const questions = _.cloneDeep(state);
        questions[action.quesionID].options[action.optionIndex].checked =
          action.value;
        return questions;
      }
      default:
        return state;
    }
  };
  const [qna, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    dispatch({
      type: "questions",
      value: quesions,
    });
  }, [quesions]);
  const handleAnswerChange = (e, index) => {
    // e.preventDefault();
    dispatch({
      type: "answer",
      quesionID: currentQuestion,
      optionIndex: index,
      value: e.target.checked,
    });
  };

  // handle next question
  function nextQuestion() {
    if (currentQuestion + 1 < quesions.length) {
      setCarrentQuestion((preCrruntQuestion) => preCrruntQuestion + 1);
    }
  }
  // handle prev question
  function prevQuestion() {
    if (currentQuestion >= 1 && currentQuestion <= quesions.length) {
      setCarrentQuestion((preCrruntQuestion) => preCrruntQuestion - 1);
    }
  }
  // calculate percentage for progress Bar
  const progressPercent =
    quesions.length > 0 ? ((currentQuestion + 1) / quesions.length) * 100 : 0;

  // handle Submit quiz
  async function submitQuiz() {
    const { uid } = currentUser;
    const db = getDatabase();
    const resultRef = ref(db, `result/${uid}`);
    await set(resultRef, {
      [id]: qna,
    });
    navigate(`/result/${id}`, { state: qna });
  }

  return (
    <>
      {loading && <div>Loading...</div>}
      {error && <div>There was an error!</div>}
      {!loading && !error && qna && qna.length > 0 && (
        <>
          <h1>{qna[currentQuestion].title}</h1>
          <h4>Question can have multiple answers</h4>
          <Answers
            input={true}
            options={qna[currentQuestion].options}
            handleChange={handleAnswerChange}
          />
          <ProgressBar
            submit={submitQuiz}
            progressPercent={progressPercent}
            next={nextQuestion}
            pre={prevQuestion}
          />
          <MiniPlayer vid={id} title={qna[currentQuestion].title} />
        </>
      )}
    </>
  );
};

export default Quiz;
