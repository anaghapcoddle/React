import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Home from '../pages/Home';
import './login.css';

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const loggedIn = window.localStorage.getItem('isLoggedIn');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post('http://localhost:8080/auth/login', { username, password })
      .then((res) => {
        navigate('/home');
        window.localStorage.setItem('token', res.data.token);
        window.localStorage.setItem('isLoggedIn', 'true');
      })
      .catch(() => {
        setError('Login failed. Please check your credentials.');
      });
  };

  return loggedIn ? (
    <Home />
  ) : (
    <div className="form-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1 className="form-title">LOG IN</h1>
        <div className="form-elements">
          <input
            type="text"
            id="username"
            placeholder="Username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-elements">
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            id="password"
            name="password"
          />
        </div>
        <button className="login-button" type="submit">
          Log In
        </button>
        <p>{error}</p>
      </form>
    </div>
  );
}

export default Login;
