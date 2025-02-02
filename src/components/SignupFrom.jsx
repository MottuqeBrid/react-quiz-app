import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../AuthContext";
import Button from "./Button";
import CheckBox from "./CheckBox";
import Form from "./Form";
import TextInput from "./TextInput";
const SignupFrom = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState();
  const [error, setError] = useState();
  const [loading, setloading] = useState();

  const { signup } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setError("Password does not match");
    }
    try {
      setError(null);
      setloading(true);
      await signup(email, password, userName);
      // setloading(false);
      navigate("/");
    } catch (error) {
      setloading(false);
      setError("faild to create account");
      console.log(error);
    }
  }

  return (
    <Form style={{ height: "500px" }} className="form" onSubmit={handleSubmit}>
      <TextInput
        type="text"
        placeholder="Enter Name"
        icon="person"
        value={userName}
        required
        onChange={(e) => setUserName(e.target.value)}
      />
      <TextInput
        type="email"
        placeholder="Enter email"
        icon="alternate_email"
        value={email}
        required
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextInput
        type="password"
        placeholder="Enter password"
        icon="lock"
        value={password}
        required
        onChange={(e) => setPassword(e.target.value)}
      />
      <TextInput
        type="password"
        placeholder="Confirm password"
        icon="lock_clock"
        value={confirmPassword}
        required
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <CheckBox
        text="I agree to the Terms &amp; Conditions"
        value={agree}
        required
        onChange={(e) => setAgree(e.target.value)}
        //   onChange={(e) => setAgree{e.target.value}}
      />
      <Button disable={loading} type="submit">
        <span>Submit now</span>
      </Button>
      {error && <p className="error">{error}</p>}
      <div className="info">
        Already have an account? <Link to="/login">Login</Link> instead.
      </div>
    </Form>
  );
};

export default SignupFrom;
