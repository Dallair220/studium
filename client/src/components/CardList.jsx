import '../styles/CardList.css';
import { useEffect, useState } from 'react';

export default function CardList({ removeHandler }) {
  const [summonerNames, setSummonerNames] = useState([]);

  const fetchData = async () => {
    const response = await fetch('/players', { method: 'GET' });
    const data = await response.json();
    console.log('data: ', data);
    setSummonerNames(data.sortedPlayers);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="cardContainer">
      {console.log('summonerNames: ', summonerNames)}
      {summonerNames?.map((entry, index) => {
        return (
          <Card
            ok={console.log(entry)}
            key={entry._id}
            name={entry.gameName}
            ranking={index + 1}
            profileIconId={entry.profileIconId}
            soloRank={entry.rank}
            removeHandler={removeHandler}
          />
        );
      })}
    </div>
  );
}

function Card({ ranking, name, soloRank, profileIconId, removeHandler }) {
  const [isHovered, setIsHovered] = useState(false);

  const rankName =
    soloRank.rank[0].toUpperCase() + soloRank.rank.slice(1).toLowerCase();
  let rankDisplay = `${rankName} ${soloRank.division} (${soloRank.leaguePoints} LP)`;
  if (rankName === 'Unranked') {
    rankDisplay = 'Unranked';
  }

  return (
    <div
      className="card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="ranking">{ranking}</div>
      <a
        href={`https://u.gg/lol/profile/euw1/${name}`}
        target="_blank"
        className="summonerName"
      >
        {name}
      </a>
      <div className="rank">{rankDisplay}</div>
      <Icon
        isHovered={isHovered}
        iconId={profileIconId}
        removeHandler={removeHandler}
        summonerName={name}
      />
    </div>
  );
}

function Icon({ isHovered, iconId, removeHandler, summonerName }) {
  return (
    <>
      {isHovered ? (
        <>
          <img
            className="icon"
            src={`https://static.bigbrain.gg/assets/lol/riot_static/13.17.1/img/profileicon/${iconId}.png`}
          />
          <img
            className="deleteImg icon"
            draggable="false"
            onClick={() => removeHandler(summonerName)}
            src={'https://cdn-icons-png.flaticon.com/512/1828/1828665.png'}
          />
        </>
      ) : (
        <img
          className="icon"
          src={`https://static.bigbrain.gg/assets/lol/riot_static/13.17.1/img/profileicon/${iconId}.png`}
        />
      )}
    </>
  );
}
