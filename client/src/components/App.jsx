import { useEffect, useState } from 'react';
import '../styles/App.css';
import Enter from './Enter';
import CardList from './CardList';
import bundleInfoBySummonerName from './utils/bundle';
import sortLadder from './utils/sortLadder';

function App() {
  const [summonerNames, setSummonerNames] = useState([]);
  const [saveLadder, setSaveLadder] = useState([]);
  let summonerNamesTmp = [];

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

  const addSummonerToLadder = async (name) => {
    // Leerzeichen entfernen
    const input = name.replace(/ /g, '');

    // Limit: 15 Einträge
    if (summonerNames.length >= 15) {
      alert('Ladder limit is at 15');
      return;
    }

    // Duplikate verhindern
    const summonerNameVorhanden = summonerNames.find((element) => {
      return (
        element.name.toLowerCase().replace(/ /g, '') === input.toLowerCase()
      );
    });
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

  const removeSummonerFromLadder = (summoner) => {
    const filteredLadder = summonerNames.filter((element) => {
      return element.name !== summoner;
    });
    setSummonerNames(filteredLadder);
  };

  const handleRefresh = () => {
    setSaveLadder(summonerNames);
    setSummonerNames([]);
  };

  useEffect(() => {
    refresher();
    summonerNamesTmp = [];
  }, [saveLadder]);

  const refresher = async () => {
    for (const summoner of saveLadder) {
      await addSummonerToLadderAfterRefresh(summoner.name);
    }
  };

  const addSummonerToLadderAfterRefresh = async (name) => {
    const bundledSummonerInfo = await bundleInfoBySummonerName(name);
    summonerNamesTmp = [...summonerNamesTmp, bundledSummonerInfo];
    const sortedList = sortLadder(summonerNamesTmp);
    setSummonerNames(sortedList);
  };

  return (
    <div className="container">
      <div className="header">
        <h1>League Ladder</h1>
      </div>
      <div className="content">
        <Enter
          addSummonerToLadder={addSummonerToLadder}
          handleRefresh={handleRefresh}
        />
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
