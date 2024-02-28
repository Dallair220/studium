import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        navigate('/');
        setTimeout(() => {
          toast.success(data.message);
        }, 50);
      } else {
        toast.warning(data.message, { autoClose: 3500 });
      }
    } catch (error) {
      toast.error(error.message, { autoClose: 5000 });
    }
  };

  return (
    <div className="container">
      <div className="header" style={{ justifyContent: 'center' }}>
        <h1>Login</h1>
      </div>
      <div className="content">
        <Link
          to="/"
          style={{ display: 'block', fontSize: '14px', textAlign: 'left' }}
        >
          ← Home
        </Link>
        <div
          style={{
            border: '1px solid #c1c1c1',
            padding: '1rem',
            marginBottom: '0.5rem',
            borderRadius: '0.5rem',
          }}
        >
          <button
            className="google-button"
            onClick={() => (window.location.href = '/auth/google')}
          >
            <GoogleSVG />
            <span>Login with Google</span>
          </button>
          <Divider />
          <form onSubmit={handleSubmit} style={{ fontSize: '18px' }}>
            <div>
              <label for="email">Email:</label>
              <br />
              <input
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                minLength="5"
              />
            </div>
            <div style={{ marginTop: '0.25rem' }}>
              <label for="password">Password:</label> <br />
              <input
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                minLength="5"
              />
            </div>
            <button
              style={{ padding: '0.125rem 0.5rem', marginTop: '0.5rem' }}
              type="submit"
            >
              Login
            </button>
          </form>
        </div>

        <div style={{ fontSize: '14px' }}>
          Don't have an account? <Link to="/register">Register here</Link>
        </div>
      </div>
      <div className="footer">
        <span style={{ fontSize: '14px', color: '#c1c1c1' }}>
          Made by Paul Hermann -{' '}
        </span>
        <a
          style={{ fontSize: '14px' }}
          href="https://github.com/Dallair220/studium"
          target="_blank"
          rel="noopener noreferrer"
        >
          View Github
        </a>
      </div>
      <ToastContainer autoClose={2000} theme="dark" />
    </div>
  );
}

export default Login;

export const Divider = () => {
  return (
    <div
      style={{ display: 'flex', alignItems: 'center', margin: '0.75rem 0rem' }}
    >
      <hr
        style={{
          flexGrow: 1,
          border: 'none',
          borderTop: '1px solid #c1c1c1',
        }}
      />
      <span style={{ margin: '0 10px', fontSize: '16px', color: '#c1c1c1' }}>
        or
      </span>
      <hr
        style={{ flexGrow: 1, border: 'none', borderTop: '1px solid #c1c1c1' }}
      />
    </div>
  );
};

export const GoogleSVG = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="24"
      height="24"
      viewBox="0 0 48 48"
    >
      <path
        fill="#fbc02d"
        d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
      ></path>
      <path
        fill="#e53935"
        d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
      ></path>
      <path
        fill="#4caf50"
        d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
      ></path>
      <path
        fill="#1565c0"
        d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
      ></path>
    </svg>
  );
};
