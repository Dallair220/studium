export default function CardList({ summonerNames }) {
  console.log('cardlist gets this:', summonerNames);
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
  return (
    <div className="card">
      <div className="ranking">{ranking}</div>
      <div className="summonerName">{name}</div>
      <div className="rank">{`${soloRank.tier} ${soloRank.rank} `}</div>
      <img
        className="icon"
        src={`https://ddragon-webp.lolmath.net/latest/img/profileicon/${profileIconId}.webp`}
      />
    </div>
  );
}
