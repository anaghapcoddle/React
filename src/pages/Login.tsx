import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/form.css';
import { postData } from '../utils/apiUtils';

interface Credentials {
  username: string;
  password: string;
}

// interface LoginProps {
//   setActualToken: React.Dispatch<React.SetStateAction<string | null>>;
// }

function Login() {
  // function Login({ setActualToken }: LoginProps) {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState<Credentials>({
    username: '',
    password: '',
  });
  const [error, setError] = useState<any>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await postData(
      `${process.env.REACT_APP_API_URL}/auth/login`,
      credentials
    );
    if (res.error !== null) {
      setError(res.error.response?.data?.error);
    } else {
      window.localStorage.setItem('token', res.data.token);
      // setActualToken(res.data.token);
      navigate('/');
    }
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
        <p className="error-message">{error}</p>
      </form>
    </div>
  );
}

export default Login;
