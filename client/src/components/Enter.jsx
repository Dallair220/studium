import { useEffect, useState } from 'react';
import '../styles/Enter.css';

export default function Enter({ addSummonerToLadder, handleRefresh }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addSummonerToLadder(input);
    setInput('');
  };

  const fetchData = async () => {
    const response = await fetch('/players', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    console.log(data); // Log the response data to the console
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="enter">
      <form onSubmit={handleSubmit}>
        <button type="button" onClick={handleRefresh} className="add refresh">
          Refresh
        </button>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          name="riotId"
          placeholder="Enter: Riot ID"
        />
        <button type="submit" className="add">
          Add
        </button>
      </form>
    </div>
  );
}
