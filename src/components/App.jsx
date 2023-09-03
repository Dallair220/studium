import { useState } from 'react';
import '../styles/App.css';
import Adding from './Adding';
import CardList from './CardList';
import Test from './Test';

function App() {
  const [summonerNames, setSummonerNames] = useState([]);

  const handleInputChange = (input) => {
    setSummonerNames([...summonerNames, input]);
  };

  console.log(summonerNames);

  return (
    <div className="container">
      <div className="header">
        <h1>League Ladder</h1>
      </div>
      <div className="content">
        <Adding onSubmit={handleInputChange} />
        <CardList summonerNames={summonerNames} />
        {/* <Test /> */}
      </div>
      <div className="footer"></div>
    </div>
  );
}

export default App;
