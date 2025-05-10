import React from "react";
import Loader from "./components/loader/loader";
import Home from "./components/loader/Background";
import Signup from "./components/signup/signup";
import Signin from "./components/signin/signin";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Loader />} />
        <Route path="/home" element={< Home/>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        

      
        

      </Routes>
    </BrowserRouter>
  );
};

export default App;
