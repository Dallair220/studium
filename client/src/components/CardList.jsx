import '../styles/CardList.css';
import { useEffect, useState } from 'react';

export default function CardList({ players, removePlayer }) {
  return (
    <div className="cardContainer">
      {players?.map((player, index) => {
        return (
          <Card
            key={player._id}
            gameName={player.gameName}
            tagLine={player.tagLine}
            ranking={index + 1}
            profileIconId={player.profileIconId}
            soloRank={player.rank}
            removePlayer={removePlayer}
            playerId={player._id}
          />
        );
      })}
    </div>
  );
}

function Card({
  ranking,
  gameName,
  tagLine,
  soloRank,
  profileIconId,
  removePlayer,
  playerId,
}) {
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
        href={`https://u.gg/lol/profile/euw1/${gameName}-${tagLine}/overview`}
        target="_blank"
        className="summonerName"
      >
        {gameName}
      </a>
      <div className="rank">{rankDisplay}</div>
      <Icon
        isHovered={isHovered}
        iconId={profileIconId}
        removePlayer={removePlayer}
        playerId={playerId}
      />
    </div>
  );
}

function Icon({ isHovered, iconId, removePlayer, playerId }) {
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
            onClick={() => removePlayer(playerId)}
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
