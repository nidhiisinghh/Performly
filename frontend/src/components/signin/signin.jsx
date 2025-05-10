import React from "react";
import { useNavigate } from "react-router-dom";

const signin = () => {
  return (
    <div className="signin-body">
      <div className="firsthalf">

        <button className="getstartedtohome" onClick={'/home'}>get started</button>
    
        
      </div>

      <div className="second">
        <div className="signin-bg">
          <div className="signin-form">
            <h1>Sign In</h1>
            <div className="signin-grid">
              <input type="text" name="" id="" placeholder="name" />
              <input type="number" name="" id="" placeholder="phone number" />
              <input type="text" name="" id="" placeholder="email"/>
              <input type="password" name="" id="" placeholder="password"/>
              <input type="password" name="" id="" placeholder="confirm password"/>
              
            </div>
            <button>LOGIN</button>
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default signin;
