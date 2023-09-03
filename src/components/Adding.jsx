import { useState } from 'react';
import '../styles/Adding.css';

export default function Adding({ onSubmit }) {
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
    <div className="adding">
      <form onSubmit={handleSubmit}>
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
