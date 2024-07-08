const { getAccountByRiotId, getSummonerByPuuid, getRankedInfoByPuuid } = require('./riotApiUtils');

// This function bundles the summoner's information by their name
async function bundleInfoBySummonerName(gameName, tagLine) {
  // get accountData, such as puuid
  const accountData = await getAccountByRiotId(gameName, tagLine);

  // get summonerData, such as summonerLevel, profileIconId, etc.
  const summonerData = await getSummonerByPuuid(accountData.puuid);

  // get rankedData, such as solo rank
  const rankedData = await getRankedInfoByPuuid(summonerData.id);
  const soloRank = findSoloRank(rankedData);

  // Returning bundled information
  return {
    gameName: accountData.gameName,
    tagLine: accountData.tagLine,
    profileIconId: summonerData.profileIconId,
    soloRank,
  };
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
