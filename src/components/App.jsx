import { useEffect, useState } from 'react';
import '../styles/App.css';
import Enter from './Enter';
import CardList from './CardList';
import bundleInfoBySummonerName from './utils/bundle';
import sortLadder from './utils/sortLadder';

function App() {
  const [summonerNames, setSummonerNames] = useState([]);
  const [saveLadder, setSaveLadder] = useState([]);

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

  const addSummonerToLadder = async (input) => {
    if (summonerNames.length > 9) {
      alert('Ladder limit is at 10');
      return;
    }
    // Duplikate verhindern
    const summonerNameVorhanden = summonerNames.find((element) => {
      console.log('input', input);
      return element.name.toLowerCase() === input.toLowerCase();
    });
    if (summonerNameVorhanden) {
      alert('Summoner name is already in the list.');
      return;
    }
    // API calls, um anhand des Summoner Namens den Rang und weitere Infos zu bekommen
    const bundledSummonerInfo = await bundleInfoBySummonerName(input);
    // Sortierung nach Rang
    const sortedList = sortLadder([...summonerNames, bundledSummonerInfo]);
    console.log('before setting...', input);
    setSummonerNames(sortedList);
  };

  const removeSummonerFromLadder = (summoner) => {
    const filteredLadder = summonerNames.filter((element) => {
      return element.name !== summoner;
    });
    setSummonerNames(filteredLadder);
  };

  const handleRefresh = () => {
    setSummonerNames([]);
    setSaveLadder(summonerNames);
  };

  useEffect(() => {
    refresher();

    return () => {
      console.log('cleanup');
    };
  }, [saveLadder]);

  const refresher = async () => {
    for await (const summoner of saveLadder) {
      console.log(summoner);
      await addSummonerToLadder(summoner.name);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1>League Ladder</h1>
      </div>
      <div className="content">
        <Enter onSubmit={addSummonerToLadder} handleRefresh={handleRefresh} />
        <CardList
          summonerNames={summonerNames}
          removeHandler={removeSummonerFromLadder}
        />
      </div>
      <div className="footer"></div>
    </div>
  );
}

export default App;
