import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../AuthContext";

import React from "react";
import Button from "./Button";
import Form from "./Form";
import TextInput from "./TextInput";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //   const [agree, setAgree] = useState();
  const [error, setError] = useState();
  const [loading, setloading] = useState();

  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError(null);
      setloading(true);
      await login(email, password);
      // setloading(false);
      navigate("/");
    } catch (error) {
      setEmail("");
      setPassword("");
      setloading(false);
      setError("faild to login");
      //   console.log(error);
    }
  }

  return (
    <Form style={{ height: "330px" }} className="form" onSubmit={handleSubmit}>
      {/* <TextInput type="text" placeholder="Enter Name" icon="person" 
      value={email}
      required
      onChange={(e) => setEmail(e.target.value)}
      /> */}
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
      <Button disable={loading} type="submit">
        <span>Submit now</span>
      </Button>
      {error && <p className="error">{error}</p>}
      <div className="info">
        Don't have an account? <Link to="/signup">Signup</Link> instead.
      </div>
    </Form>
  );
};

export default LoginForm;
