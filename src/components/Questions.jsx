import style from "../styles/Question.module.css";
import Answers from "./Answers";
const Questions = ({ answers = [] }) => {
  return answers.map((answer, index) => {
    return (
      <div className={style.question} key={index}>
        <div className={style.qtitle}>
          <span className="material-icons-outlined"> help_outline </span>
          {/* Here goes the question from Learn with Sumit? */}
          {answer.title}
        </div>
        <Answers options={answer.options} input={false} />
      </div>
    );
    // );
  });
  // return (
  //   <div className={style.question}>
  //     <div className={style.qtitle}>
  //       <span className="material-icons-outlined"> help_outline </span>
  //       Here goes the question from Learn with Sumit?
  //     </div>
  //     <Answers />
  //   </div>
  // );
};

export default Questions;
