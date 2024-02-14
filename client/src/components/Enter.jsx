import { useState } from 'react';
import '../styles/Enter.css';

export default function Enter({ handleRefresh }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // addSummonerToLadder(input);
    console.log('addSummonerToLadder: ', input);
    setInput('');
  };

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
