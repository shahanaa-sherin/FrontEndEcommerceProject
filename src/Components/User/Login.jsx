import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const backendUrl = "http://localhost:4000/login";

  async function handleSubmit(event) {
    event.preventDefault();
    console.log(username, password);
    try {
      await axios.post(backendUrl, {
        username,
        password,
      });
    } catch (error){ 
      console.log("error has occured", error);
    }
  }

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Login</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        className="div"
      >
        <form onSubmit={handleSubmit}>
          <input
            type="username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="username"
          />
          <br />
          <br />
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
          />
          <br />
          <br />
          <Link to={"/reset"}>Forget Password</Link>
          <button type="submit">Login</button>
          <br />
          <br />
          <Link to={"/register"} className=" text-red-600 underline">
            Create Account
          </Link>
        </form>
        <p id="error">{error}</p>
      </div>
    </>
  );
}

export default Login;
