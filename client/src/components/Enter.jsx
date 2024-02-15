import { useState } from 'react';
import '../styles/Enter.css';

export default function Enter({ createPlayer, updateAllPlayers }) {
  const [gameName, setGameName] = useState('');
  const [tagLine, setTagLine] = useState('EUW');

  const handleSubmit = async (e) => {
    e.preventDefault();
    createPlayer(gameName, tagLine);
    setGameName('');
    setTagLine('EUW');
  };

  return (
    <div className="enter">
      <form onSubmit={handleSubmit}>
        <button
          type="button"
          onClick={updateAllPlayers}
          className="add refresh"
        >
          Refresh
        </button>
        <input
          value={gameName}
          onChange={(e) => setGameName(e.target.value)}
          type="text"
          name="gameName"
          className="gameName"
          placeholder="Summoner name"
          minLength={3}
          maxLength={23}
          required
        />
        <span>#</span>
        <input
          value={tagLine}
          onChange={(e) => setTagLine(e.target.value)}
          type="text"
          name="tagLine"
          className="tagLine"
          placeholder="Tagline"
          minLength={3}
          maxLength={5}
          required
        />
        <button type="submit" className="add">
          Add
        </button>
      </form>
    </div>
  );
}
