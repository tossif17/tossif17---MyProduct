import React, { useState } from "react";
import "./App.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const baseUrl = `https://tosif-webjob.azurewebsites.net`;

export const Register = () => {
  const data = { name: "", email: "", password: "" };
  const [value, setValue] = useState(data);
  const navigate = useNavigate();

  const handelChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
    console.log(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const users = await axios.post(baseUrl + `/adduser`, value);

      if (users) {
        navigate("/product");
        setValue(data);
      }
    } catch (error) {
      console.error("There was an error submitting the form: ", error);
    }
  };

  return (
    <div className="register-main">
      <div className="container">
        <form className="form-style" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Enter Name</label>
            <input
              onChange={handelChange}
              type="text"
              className="form-control register-style"
              name="name"
              value={value.name}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              onChange={handelChange}
              type="email"
              className="form-control register-style"
              name="email"
              value={value.email}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              onChange={handelChange}
              type="password"
              className="form-control register-style"
              name="password"
              value={value.password}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};
