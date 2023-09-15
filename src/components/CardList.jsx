import '../styles/CardList.css';
import { useState } from 'react';

export default function CardList({ summonerNames }) {
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
          />
        );
      })}
    </div>
  );
}

function Card({ ranking, name, soloRank, profileIconId }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleClick = () => {
    console.log('DELETE!');
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
          // src={`https://ddragon-webp.lolmath.net/latest/img/profileicon/${profileIconId}.webp`}
          src={`https://static.bigbrain.gg/assets/lol/riot_static/13.17.1/img/profileicon/${profileIconId}.png`}
        />
      )}
    </div>
  );
}
