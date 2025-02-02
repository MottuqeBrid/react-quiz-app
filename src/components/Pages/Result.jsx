import React from "react";
import Analysis from "../Analysis";
import Summary from "../Summary";
import { useLocation, useParams } from "react-router";
import useAnswers from "../hooks/useAnswers";
import Answers from "../Answers";
import _ from "lodash";

const Result = () => {
  const { id } = useParams();
  const location = useLocation();
  const qna = location.state || {};
  const { loading, error, answers } = useAnswers(id);
  // console.log(answers);

  function calculate() {
    let score = 0;
    answers.forEach((quesion, index1) => {
      let correctIndexes = [],
        checkedIndexes = [];
      quesion.options.forEach((option, index2) => {
        if (option.correct) {
          correctIndexes.push(index2);
        }
        if (qna[index1].options[index2].checked) {
          checkedIndexes.push(index2);
          option.checked = true;
        }
      });
      if (_.isEqual(correctIndexes, checkedIndexes)) {
        score = score + 5;
      }
    });
    return score;
  }
  const userscore = calculate();
  // console.log(userscore);

  return (
    <>
      {loading && <div>Loading...</div>}
      {error && <div>There was an error!</div>}
      {answers && answers.length > 0 && (
        <>
          <Summary score={userscore} noq={answers.length * 5} />
          <Analysis answers={answers} />
        </>
      )}
    </>
  );
};

export default Result;
