import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const Loginform = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  const baseUrl = `https://tosifwebapp.azurewebsites.net`;
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        baseUrl + `/login?email=${email}&password=${password}`
      );
      if (response.data === true) {
        navigate("/product");
      } else {
        setErrMsg("Invalid username and password");
      }
    } catch {
      console.error("Login error:");
    }
  };

  return (
    <div className="register-main">
      <div className="container">
        <form className="form-style" onSubmit={handleClick}>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              onChange={handleChange}
              type="email"
              className="form-control register-style"
              name="email"
              required
            />
            {errMsg && <span style={{ color: "red" }}>{errMsg}</span>}
          </div>
          <div>
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              onChange={handleChange}
              type="password"
              className="form-control register-style"
              name="password"
              required
            />
          </div>
          {errMsg && <span style={{ color: "red" }}>{errMsg}</span>}

          <div className="register-link mt-3">
            <button type="submit" className="btn btn-primary">
              Login
            </button>
            <Link to="/register">Register</Link>
          </div>
        </form>
      </div>
    </div>
  );
};
