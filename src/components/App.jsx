import { useEffect, useState } from 'react';
import '../styles/App.css';
import Enter from './Enter';
import CardList from './CardList';
import bundleInfoBySummonerName from './utils/bundle';
import sortLadder from './utils/sortLadder';

function App() {
  const [summonerNames, setSummonerNames] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem('summonerNames');
    // Endlosschleife verhindern
    if (data !== JSON.stringify(summonerNames)) {
      const parsedData = JSON.parse(data);
      parsedData === null ? setSummonerNames([]) : setSummonerNames(parsedData);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('summonerNames', JSON.stringify(summonerNames));
  }, [summonerNames]);

  // Eventhandler für neuer SN hinzugefügt
  const handleInputChange = async (input) => {
    // Duplikate verhindern
    const summonerNameVorhanden = summonerNames.find(
      (element) => element.name.toLowerCase() === input.toLowerCase(),
    );
    if (summonerNameVorhanden) {
      alert('Summoner name is already in the list.');
      return;
    }
    // API calls, um anhand des Summoner Namens den Rang und weitere Infos zu bekommen
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
