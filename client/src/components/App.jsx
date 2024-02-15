import { useEffect, useState } from 'react';
import '../styles/App.css';
import Enter from './Enter';
import CardList from './CardList';

function App() {
  const [players, setPlayers] = useState([]);

  const getAllPlayers = async () => {
    const response = await fetch('/players', { method: 'GET' });
    const data = await response.json();
    setPlayers(data.sortedPlayers);
  };

  const createPlayer = async (gameName, tagLine) => {
    const response = await fetch('/player/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ gameName, tagLine }),
    });
    const data = await response.json();
    getAllPlayers();
  };

  const updatePlayer = async (playerId, gameName, tagLine) => {
    const response = await fetch(`/player/${playerId}/update`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ gameName, tagLine }),
    });
    const data = await response.json();
    getAllPlayers();
  };

  const removePlayer = async (playerId) => {
    const response = await fetch(`/player/${playerId}/delete`, {
      method: 'POST',
    });
    const data = await response.json();
    getAllPlayers();
  };

  useEffect(() => {
    getAllPlayers();
  }, []);

  return (
    <div className="container">
      <div className="header">
        <h1>League Ladder</h1>
      </div>
      <div className="content">
        <Enter createPlayer={createPlayer} />
        <CardList players={players} removePlayer={removePlayer} />
      </div>
      <div className="footer"></div>
    </div>
  );
}

export default App;
