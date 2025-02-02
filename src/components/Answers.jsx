import React, { Fragment } from "react";
import classes from "../styles/Answers.module.css";
import CheckBox from "./CheckBox";

const Answers = ({ options = [], handleChange, input }) => {
  // console.log(input);
  // console.log(options);
  return (
    <div className={classes.answers}>
      {options.map((option, index) => {
        // console.log(option);
        return (
          <Fragment key={index}>
            {input ? (
              <CheckBox
                key={index}
                className={classes.answer}
                text={option.title}
                value={index}
                checked={option.checked}
                onChange={(e) => {
                  handleChange(e, index);
                }}
              />
            ) : (
              <CheckBox
                key={index}
                className={`${classes.answer} ${
                  option.correct
                    ? classes.correct
                    : option.checked
                    ? classes.wrong
                    : null
                }`}
                text={option.title}
                defaultChecked={option.checked}
                disabled
              />
            )}
          </Fragment>
        );
      })}
      {/* <CheckBox  className={classes.answer} text="test Answer" /> */}
    </div>
  );
};

export default Answers;
