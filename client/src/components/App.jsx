import { useEffect, useState } from 'react';
import '../styles/App.css';
import Enter from './Enter';
import CardList from './CardList';

function App() {
  return (
    <div className="container">
      <div className="header">
        <h1>League Ladder</h1>
      </div>
      <div className="content">
        <Enter />
        <CardList />
      </div>
      <div className="footer"></div>
    </div>
  );
}

export default App;
