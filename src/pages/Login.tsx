import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './login.css';

interface Credentials {
  username: string;
  password: string;
}

function Login() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState<Credentials>({
    username: '',
    password: '',
  });
  const [error, setError] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post('http://localhost:8080/auth/login', credentials)
      .then((res) => {
        navigate('/');
        window.localStorage.setItem('token', res.data.token);
      })
      .catch((err) => {
        setError(err.response.data.error);
      });
  };

  return (
    <div className="form-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1 className="form-title">LOG IN</h1>
        <div className="form-elements">
          <input
            type="text"
            id="username"
            placeholder="Username"
            name="username"
            value={credentials.username}
            onChange={(e) =>
              setCredentials({ ...credentials, username: e.target.value })
            }
          />
        </div>
        <div className="form-elements">
          <input
            value={credentials.password}
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
            type="password"
            placeholder="Password"
            id="password"
            name="password"
          />
        </div>
        <button className="login-button" type="submit">
          Log In
        </button>
        <p className="errorMessage">{error}</p>
      </form>
    </div>
  );
}

export default Login;
