import Lottie from 'lottie-react';
import React, { useState } from "react";
import { Link } from 'react-router-dom';
import logo from '../images/logo.json';
import "./login.css";

let user;
const sendUser = () =>{
  user = document.getElementById("logInput").value;
}

const Login = () => {

  const [name, setName] =  useState("");
  console.log(name);

  return (
    
     <>
      <div className="login-page">
        <div className="container">
          <div className='logo'>
            <Lottie className='logoimg' animationData={logo} />
            <h1>Talk To Me</h1>
          </div>
          <h1>LOG IN</h1>
          <div className="input">
            <input placeholder='email' onChange={(e)=>setName(e.target.value)} type="text" id="logInput" />
            <Link to="/chat"onClick={(event)=> !name?event.preventDefault():null}><button onClick={sendUser} className="loginbtn">LOG IN</button></Link>
          </div>
          <p>Don't have an account? Sign in</p>
        </div>
      </div>
    </>
  );
};

export default Login;
export { user };

