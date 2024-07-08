'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';
import { GoogleSVG, Divider } from '../login/page';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + '/auth/register',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        },
      );
      const data = await response.json();
      if (response.ok) {
        router.push('/login');
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
          href="/"
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
              <label htmlFor="email">Email:</label>
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
              <label htmlFor="password">Password:</label> <br />
              <input
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                minLength="10"
              />
            </div>
            <button
              style={{ padding: '0.125rem 0.5rem', marginTop: '0.5rem' }}
              type="submit"
            >
              Register
            </button>
          </form>
        </div>
        <div style={{ fontSize: '14px', color: 'white' }}>
          Already have an account? <Link href="/login">Login here</Link>
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
    </div>
  );
}

export default Register;
