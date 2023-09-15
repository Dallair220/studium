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
      <div className="summonerName">{name}</div>
      <div className="rank">{`${soloRank.tier} ${soloRank.rank} `}</div>
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
        <img
          className="icon deleteImg"
          onClick={handleClick}
          src={'../../src/assets/minus.png'}
        />
      ) : (
        <img
          className="icon"
          // src={`https://ddragon-webp.lolmath.net/latest/img/profileicon/${iconId}.webp`}
          src={`https://static.bigbrain.gg/assets/lol/riot_static/13.17.1/img/profileicon/${iconId}.png`}
        />
      )}
    </>
  );
}
