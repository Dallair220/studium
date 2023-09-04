import { useState } from 'react';
import '../styles/App.css';
import Enter from './Enter';
import CardList from './CardList';
import bundleInfoBySummonerName from './utils/bundle';

function App() {
  const [summonerNames, setSummonerNames] = useState([]);

  const handleInputChange = async (input) => {
    const bundledSummonerInfo = await bundleInfoBySummonerName(input);
    setSummonerNames([...summonerNames, bundledSummonerInfo]);
  };

  console.log('summonerNames wird an CardList übergeben:', summonerNames);

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
