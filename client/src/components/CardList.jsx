import { useState } from 'react';
import Image from 'next/image';
import deleteImgIcon from './deleteImgIcon.webp';

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
      <Image
        className="icon"
        src={`https://ddragon.leagueoflegends.com/cdn/14.13.1/img/profileicon/${iconId}.png`}
        alt="Player Icon"
        width={64}
        height={64}
        style={{ width: 'auto' }}
      />
      <Image
        className="deleteImg icon"
        draggable="false"
        onClick={() => removePlayer(playerId)}
        src={deleteImgIcon}
        alt="Delete Player"
        width={64}
        height={64}
        style={{
          display: isHovered ? 'block' : 'none', // Show image only when hovered
          width: 'auto',
        }}
      />
    </>
  );
}
