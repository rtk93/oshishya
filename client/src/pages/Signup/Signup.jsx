import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import './Signup.css'

const Signup = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    username: "", 
    fullname: "", 
    email: "",
    mobile: "", 
    role: "",
    password: "",
  });
  const { username, fullname, email, mobile, role, password } = inputValue;
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err) =>
    console.log(err);
  const handleSuccess = (msg) =>
    console.log(msg);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputValue)
    try {
      const { data } = await axios.post(
        "https://api-oshishya.onrender.com/signup",
        {
          ...inputValue,
        },
        { withCredentials: true }
      );
      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
    }
    setInputValue({
      ...inputValue,
      username: "",
      fullname: "",
      email: "",
      mobile: "",
      password: "",
      role: "",
    });
  };

  return (
    <div className="wrap-signup">
    <div className="signup-box">
      <form  className="signup-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Enter your email"
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="mobile">Mobile</label>
          <input
            type="text"
            name="mobile"
            value={mobile}
            placeholder="Enter your mobile number"
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="uname">Username</label>
          <input
            type="text"
            name="username"
            value={username}
            placeholder="Enter your username"
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="fname">Fullname</label>
          <input
            type="text"
            name="fullname"
            value={fullname}
            placeholder="Enter your fullname"
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Enter your password"
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="role">Role</label>
          <input
            type="text"
            name="role"
            value={role}
            placeholder="Enter your role"
            onChange={handleOnChange}
          />
        </div>
        <button type="submit">Signup</button>
        <span>
          Already have an account? <Link to={"/login"}>Login</Link>
        </span>
      </form>
    </div>
    </div>
  );
};

export default Signup;
