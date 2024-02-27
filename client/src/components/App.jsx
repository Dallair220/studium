import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Enter from './Enter';
import CardList from './CardList';

function App() {
  const [players, setPlayers] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const getAllPlayers = async () => {
    try {
      const response = await fetch('/players', {
        method: 'GET',
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      setPlayers(data.sortedPlayers);
    } catch (error) {
      toast.error(error.message, { autoClose: 5000 });
    }
  };

  const createPlayer = async (gameName, tagLine) => {
    try {
      const response = await fetch('/players', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gameName, tagLine }),
      });
      const data = await response.json();
      if (!response.ok) {
        if (data.status === 'error') {
          toast.warning(data.message);
        } else {
          throw new Error(data.message);
        }
      }
      if (data.status === 'success') {
        toast.success(data.message);
        getAllPlayers();
      }
    } catch (error) {
      if (error.message === 'Unauthorized. Please log in.') {
        navigate('/login');
        setTimeout(() => {
          toast.error(error.message);
        }, 50);
      } else {
        toast.error(error.message, { autoClose: 5000 });
      }
    }
  };

  const updatePlayer = async (playerId) => {
    try {
      const response = await fetch(`/players/${playerId}`, {
        method: 'PUT',
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const removePlayer = async (playerId) => {
    try {
      const response = await fetch(`/players/${playerId}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (!response.ok) {
        if (data.status === 'error') {
          toast.warning(data.message);
        } else {
          throw new Error(data.message);
        }
      }
      if (data.status === 'success') {
        toast.success(data.message);
        getAllPlayers();
      }
    } catch (error) {
      if (error.message === 'Unauthorized. Please log in.') {
        navigate('/login');
        setTimeout(() => {
          toast.error(error.message);
        }, 50);
      } else {
        toast.error(error.message, { autoClose: 5000 });
      }
    }
  };

  const updateAllPlayers = async () => {
    setIsUpdating(true);
    try {
      await Promise.all(players.map((player) => updatePlayer(player._id)));
      toast.success('All players updated.');
    } catch (error) {
      toast.error(error.message, { autoClose: 5000 });
    }
    getAllPlayers();
    setIsUpdating(false);
  };

  const logout = async () => {
    try {
      const response = await fetch('/auth/logout', {
        method: 'POST',
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      checkAuthentication();
    } catch (error) {
      toast.error(error.message, { autoClose: 5000 });
    }
  };

  const checkAuthentication = async () => {
    try {
      const response = await fetch('/auth/check', {
        method: 'GET',
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      setIsAuthenticated(data.isAuthenticated);
    } catch (error) {
      toast.error(error.message, { autoClose: 5000 });
    }
  };

  useEffect(() => {
    checkAuthentication();
    getAllPlayers();
  }, []);

  return (
    <div className="container">
      <div className="header">
        <div style={{ width: '20%' }}></div>
        <h1>League Ladder</h1>
        <div
          style={{
            width: '20%',
            display: 'flex',
            justifyContent: 'flex-end',
            marginRight: '1rem',
            marginTop: '-1rem',
            gap: '1rem',
          }}
        >
          {isAuthenticated ? (
            <Link to="/" className="logout" onClick={() => logout()}>
              Logout
            </Link>
          ) : (
            <>
              <Link to="/login" className="login">
                Login
              </Link>
              <Link to="/register" className="register">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
      <div className="content">
        <Enter
          createPlayer={createPlayer}
          updateAllPlayers={updateAllPlayers}
        />
        {isUpdating ? (
          <div className="spinner-container">
            <div className="spinner"></div>
          </div>
        ) : (
          <CardList players={players} removePlayer={removePlayer} />
        )}
      </div>
      <div className="footer">
        <span style={{ fontSize: '14px', color: '#c1c1c1' }}>
          Made by Paul Hermann - {''}
        </span>
        <a
          style={{ fontSize: '14px' }}
          href="https://github.com/Dallair220/studium"
          target="_blank"
        >
          View Github
        </a>
      </div>
      <ToastContainer autoClose={2000} theme="dark" />
    </div>
  );
}

export default App;
