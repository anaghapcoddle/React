import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/form.css';
import { postData } from '../utils/apiUtils';

interface Signupdata {
  username: string;
  email: string;
  password: string;
}

function Signup() {
  const navigate = useNavigate();
  const [signupData, setSignupData] = useState<Signupdata>({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState<any>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await postData(
      `${process.env.REACT_APP_API_URL}/auth/signup`,
      signupData
    );
    if (res.error === null) {
      const loginCredentials = {
        username: signupData.username,
        password: signupData.password,
      };
      const loginRes = await postData(
        `${process.env.REACT_APP_API_URL}/auth/login`,
        loginCredentials
      );
      localStorage.setItem('token', JSON.stringify(loginRes.data.token));
      navigate('/');
    }
    if (res.error !== null) {
      setError(res.error.response?.data?.error);
    } else {
      setSignupData({
        username: '',
        email: '',
        password: '',
      });
      setError('');
    }
  };

  return (
    <div className="form-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h1 className="form-title">SIGN UP</h1>
        <div className="form-elements">
          <input
            type="text"
            id="username"
            placeholder="Username"
            name="username"
            value={signupData.username}
            onChange={(e) =>
              setSignupData({ ...signupData, username: e.target.value })
            }
          />
        </div>
        <div className="form-elements">
          <input
            type="text"
            placeholder="Email"
            id="email"
            name="email"
            value={signupData.email}
            onChange={(e) =>
              setSignupData({ ...signupData, email: e.target.value })
            }
          />
        </div>
        <div className="form-elements">
          <input
            type="password"
            placeholder="Password"
            id="password"
            name="password"
            value={signupData.password}
            onChange={(e) =>
              setSignupData({ ...signupData, password: e.target.value })
            }
          />
        </div>
        <p className="error-message">{error}</p>
        <button className="signup-button button-design" type="submit">
          Sign up
        </button>
      </form>
    </div>
  );
}

export default Signup;
