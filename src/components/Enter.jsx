import { useState } from 'react';
import '../styles/Enter.css';

export default function Enter({ onSubmit, handleRefresh }) {
  const [input, setInput] = useState('');

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(input);
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
          onChange={handleInputChange}
          type="text"
          placeholder="Enter: Summoner Name"
        />
        <button type="submit" className="add">
          Add
        </button>
      </form>
    </div>
  );
}
