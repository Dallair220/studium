import { useState } from 'react';
import '../styles/App.css';
import Enter from './Enter';
import CardList from './CardList';
import bundleInfoBySummonerName from './utils/bundle';
import sortLadder from './utils/sortLadder';

function App() {
  const [summonerNames, setSummonerNames] = useState([]);

  const handleInputChange = async (input) => {
    const bundledSummonerInfo = await bundleInfoBySummonerName(input);
    // Sortierung nach Rang
    const sortedList = sortLadder([...summonerNames, bundledSummonerInfo]);
    setSummonerNames(sortedList);
  };

  return (
    <div className="container">
      <div className="header">
        <h1>League Ladder</h1>
      </div>
      <div className="content">
        <Enter onSubmit={handleInputChange} />
        <CardList summonerNames={summonerNames} />
      </div>
      <div className="footer"></div>
    </div>
  );
}

export default App;
