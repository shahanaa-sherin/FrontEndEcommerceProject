import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import OtpVerification from "../../pages/otpverification";

function Login() {
  const [error, setError] = useState("");
  const [page, setPage] = useState(false);
  const [data, setData] = useState({
    username: "shahanas",
    email: "shahana@gmail",
    password: "A!123asd",
    cPassword: "A!123asd",
  });
  // const backendUrl = "http://localhost:3000/register";

  const changeData = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
    // console.log(data);
  };

  async function validation(e) {
    e.preventDefault();
    const password = data.password;
    const cPassword = data.cPassword;
    let re =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const test = re.test(password);
    if (test && password === cPassword) {
      try {
        setError("");
        const res = await axios.post("http://localhost:4000/register", data);
        setPage(true);
        return true;
      } catch (error) {
        console.log(error);
        if (error.response.status == 400) {
          setError(error.response.data.error);
        }
      }
    } else {
      if (!test) {
        setError(
          "your password must contain 8 charactesrs with uppercase,lowercase,spl character and number"
        );
      } else if (password !== cPassword) {
        setError("your password doesnt match");
      }
      return false;
    }
  }

  return (
    <>
      {page ? (
        <OtpVerification />
      ) : (
        <div>
          <h1 className="text-center bg-slate-950 text-red-700 text-3xl  ">
            Register
          </h1>
          <br />
          <div className="text-center">
            <form onSubmit={validation}>
              <input
                className="appearance-none rounded-none relative block px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                type="username"
                name="username"
                required
                value={data.username}
                onChange={changeData}
                placeholder="username"
              />
              <br />
              <br />
              <input
                className="appearance-none  rounded-none relative block px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                type="email"
                name="email"
                required
                value={data.email}
                onChange={changeData}
                placeholder="email"
              />
              <br />
              <br />

              <input
                className="appearance-none rounded-none relative block  px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                type="password"
                required
                name="password"
                value={data.password}
                onChange={changeData}
                placeholder="password"
              />
              <br />
              <br />
              <input
                className="appearance-none rounded-none relative block  px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                type="password"
                name="cPassword"
                required
                value={data.cPassword}
                onChange={changeData}
                placeholder="confirm password"
              />
              <br />
              <br />
              <button className="" type="submit">
                submit
              </button>
            </form>
          </div>
          <p className="text-red-600" id="error">
            {error}
          </p>
          <Link to={"/login"} className=" text-red-600 underline">
            CLICK HERE TO LOGIN
          </Link>
        </div>
      )}
    </>
  );
}

export default Login;
