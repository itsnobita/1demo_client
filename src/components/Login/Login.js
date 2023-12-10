// Import necessary dependencies
import React, { useState } from 'react';
import "./login.css"
import axios from 'axios';
import { domainName } from '../../config/urls';

// Define the Login component
const Login = () => {
  // State variables to store username and password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Event handler for handling form submission
  const handleLogin =async (e) => {
      e.preventDefault();
      
     await axios.post(`${domainName}/usr/login`, {
          username: username,
          password:password
      }).then(r => {
          console.log(r)
      })
    
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

// Export the Login component
export default Login;
