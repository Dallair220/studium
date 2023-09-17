import '../styles/CardList.css';
import { useState } from 'react';

export default function CardList({ summonerNames, removeHandler }) {
  return (
    <div className="cardContainer">
      {summonerNames.map((entry, index) => {
        return (
          <Card
            key={entry.name}
            name={entry.name}
            ranking={index + 1}
            profileIconId={entry.profileIconId}
            soloRank={entry.soloRank}
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
    soloRank.tier[0].toUpperCase() + soloRank.tier.slice(1).toLowerCase();
  let rankDisplay = `${rankName} ${soloRank.rank} (${soloRank.leaguePoints} LP)`;
  if (rankName === 'Unranked') {
    rankDisplay = 'Unranked';
  }

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className="card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="ranking">{ranking}</div>
      <a
        href={`https://www.leagueofgraphs.com/summoner/euw/${name}`}
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
  const handleClick = () => {
    removeHandler(summonerName);
  };

  return (
    <>
      {/* Conditional rendering */}
      {isHovered ? (
        <>
          <img
            className="icon"
            src={`https://static.bigbrain.gg/assets/lol/riot_static/13.17.1/img/profileicon/${iconId}.png`}
          />
          <img
            className="deleteImg icon"
            draggable="false"
            onClick={handleClick}
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
