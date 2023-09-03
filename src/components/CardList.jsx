export default function CardList({ summonerNames }) {
  return (
    <div className="cardContainer">
      {summonerNames.map((entry, index) => {
        return <Card name={entry} ranking={index + 1} />;
      })}
    </div>
  );
}

function Card({ ranking, name, rank, icon }) {
  return (
    <div className="card">
      <div className="ranking">{ranking}</div>
      <div className="summonerName">{name}</div>
      <div className="rank">rr</div>
      <div className="icon">i</div>
    </div>
  );
}
