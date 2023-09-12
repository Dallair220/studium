import { useEffect, useState } from 'react';
import '../styles/App.css';
import Enter from './Enter';
import CardList from './CardList';
import bundleInfoBySummonerName from './utils/bundle';
import sortLadder from './utils/sortLadder';

function App() {
  const [summonerNames, setSummonerNames] = useState([]);

  // Speicherung Rangliste
  useEffect(() => {
    window.localStorage.setItem(
      'LeagueLadder_STATE',
      JSON.stringify(summonerNames),
    );
  }, [summonerNames]); // Add summonerNames as a dependency

  useEffect(() => {
    const data = window.localStorage.getItem('LeagueLadder_STATE');
    if (data !== null) {
      const parsedData = JSON.parse(data);
      // Check if the parsed data is different from the current state to avoid an infinite loop
      if (JSON.stringify(parsedData) !== JSON.stringify(summonerNames)) {
        setSummonerNames(parsedData);
      }
    }
  }, []); // Add an empty dependency array to run this only once when the component mounts

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
