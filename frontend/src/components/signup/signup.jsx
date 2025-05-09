import React from "react";
import { useNavigate } from "react-router-dom";
import home from "../loader/Background";

const signup = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/signin");
  };

  const isvalid = () => {
    alert("logged in");
    navigate("/home");
  };
  //   const rects = Array.from({ length: 5 }, (_, index) => (
  //     <div key={index} className="secondhalf"></div>
  //   ));
  return (
    <div className="signup-body">
      <div className="firsthalf"></div>
      
    

      <div className="second">
        <div className="signup-bg">
          <div className="signup-form">
            <h1>Sign Up</h1>
            <div className="signup-grid">
              <input
                type="text"
                placeholder="username"
                className="username-box"
              />
              <input
                type="password"
                placeholder="password"
                className="password-box"
              />
            </div>

            <button onClick={isvalid}>Login</button>
            <a href="" onClick={handleClick} className="new-user">
              new user?create account
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default signup;
