// Import necessary dependencies
import React, { useState } from "react";
import "./login.css";
import axios from "axios";
import { domainName } from "../../config/urls";

// Define the Login component
const Login = () => {
  // State variables to store username and password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Event handler for handling form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    let deviceDetails = {
      userAgent: navigator.userAgent,
      appCodeName: navigator.appCodeName,
      appName: navigator.appName,
      appVersion: navigator.appVersion,
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      devicePixelRatio: window.devicePixelRatio,
      language: navigator.language,
      platform: navigator.platform,
    };

    await axios
      .post(`${domainName}/usr/login`, {
        username: username,
        password: password,
        deviceDetails,
      })
      .then((r) => {
        console.log(r);
      });
  };

  console.log(navigator, "==navigaot\n", window);

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin} className="loginForm">
        <label className="loginlabel">
          Username:
          <input
            className="logininput"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label className="loginlabel">
          Password:
          <input
            className="logininput"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="submit" className="loginButton">
          Login
        </button>
      </form>
    </div>
  );
};

// Export the Login component
export default Login;
