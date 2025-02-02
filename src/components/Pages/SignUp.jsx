import signupImg from "../../assets/images/signup.svg";
import Illustration from "../Illustration";
import SignupFrom from "../SignupFrom";

const SignUp = () => {
  return (
    <>
      <h1>Create an account</h1>
      <div className="column">
        <Illustration image={signupImg} />
        <SignupFrom /> 
      </div>
    </>
  );
};

export default SignUp;
