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
  const [signupdata, setSignupData] = useState<Signupdata>({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState<any>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await postData(
      `${process.env.REACT_APP_API_URL}/auth/signup`,
      signupdata
    );
    if (res.error === null) {
      const loginCredentials = {
        username: signupdata.username,
        password: signupdata.password,
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
            value={signupdata.username}
            onChange={(e) =>
              setSignupData({ ...signupdata, username: e.target.value })
            }
          />
        </div>
        <div className="form-elements">
          <input
            type="text"
            placeholder="Email"
            id="email"
            name="email"
            value={signupdata.email}
            onChange={(e) =>
              setSignupData({ ...signupdata, email: e.target.value })
            }
          />
        </div>
        <div className="form-elements">
          <input
            type="password"
            placeholder="Password"
            id="password"
            name="password"
            value={signupdata.password}
            onChange={(e) =>
              setSignupData({ ...signupdata, password: e.target.value })
            }
          />
        </div>
        <p className="error-message">{error}</p>
        <button className="signup-button" type="submit">
          Sign up
        </button>
      </form>
    </div>
  );
}

export default Signup;
