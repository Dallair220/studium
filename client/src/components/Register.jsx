import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        navigate('/login');
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
        <h1>Register</h1>
      </div>
      <div className="content">
        <Link
          to="/"
          style={{ display: 'block', fontSize: '14px', textAlign: 'left' }}
        >
          ← Home
        </Link>
        <form
          onSubmit={handleSubmit}
          style={{
            border: '1px solid #c1c1c1',
            padding: '1rem',
            marginBottom: '0.5rem',
            borderRadius: '0.5rem',
          }}
        >
          <div>
            <label htmlFor="email">Email:</label>
            <br />
            <input
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>
          <div style={{ marginTop: '0.25rem' }}>
            <label htmlFor="password">Password:</label> <br />
            <input
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>
          <button
            style={{ padding: '0.125rem 0.5rem', marginTop: '0.5rem' }}
            type="submit"
          >
            Register
          </button>
        </form>
        <div style={{ fontSize: '14px' }}>
          Already have an account? <Link to="/login">Login here</Link>
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

export default Register;
