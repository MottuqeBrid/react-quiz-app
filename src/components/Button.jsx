import classes from "../styles/Button.module.css";

const Button = ({ className, children,...res }) => {
  return (
    <button {...res} className={`${classes.button} ${className}`}>
      <span>{children}</span>
    </button>
  );
};

export default Button;
