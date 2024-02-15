const { getInfoBySummonerName, getRankedInfoBySummonerId } = require('./riotApiUtils');

// This function bundles the summoner's information by their name
async function bundleInfoBySummonerName(summonerName) {
  // Fetching summoner's basic information
  const summonerData = await getInfoBySummonerName(summonerName);
  const gameName = summonerData.name;
  const profileIconId = summonerData.profileIconId;

  // Fetching summoner's ranked information
  const rankedData = await getRankedInfoBySummonerId(summonerData.id);
  const soloRank = findSoloRank(rankedData);

  // Returning bundled information
  return { gameName, profileIconId, soloRank };
}

// This function finds the solo rank from the ranked data
function findSoloRank(rankedData) {
  // Finding the entry for solo ranked games
  const result = rankedData.find((entry) => entry.queueType === 'RANKED_SOLO_5x5');
  // If no entry is found, the player is unranked. Otherwise, we extract the rank information.
  let tier, rank, leaguePoints, wins, losses;
  if (result === undefined) {
    tier = 'UNRANKED';
  } else {
    tier = result.tier;
    rank = result.rank;
    leaguePoints = result.leaguePoints;
    wins = result.wins;
    losses = result.losses;
  }

  return { tier, rank, leaguePoints, wins, losses };
}

module.exports = bundleInfoBySummonerName;
