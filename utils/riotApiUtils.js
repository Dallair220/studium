// search by summoner name to get the summonerID
// https://developer.riotgames.com/apis#summoner-v4/GET_getBySummonerName
async function getInfoBySummonerName(summonerName) {
  try {
    const response = await fetch(
      `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${process.env.RIOT_API_KEY}`
    );
    const summonerData = await response.json();
    if (summonerData.status?.status_code === 404) {
      throw new Error('Player not found');
    }
    if (!response.ok) {
      throw new Error(summonerData.status.message);
    }
    return summonerData;
  } catch (error) {
    throw new Error(error.message);
  }
}

// use summonerID to get ranked information (for the ladder)
// https://developer.riotgames.com/apis#league-v4/GET_getLeagueEntriesForSummoner
async function getRankedInfoBySummonerId(summonerId) {
  try {
    const response = await fetch(
      `https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}?api_key=${process.env.RIOT_API_KEY}`
    );
    const rankedData = await response.json();
    if (!response.ok) {
      throw new Error(rankedData.status.message);
    }
    return rankedData;
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = { getInfoBySummonerName, getRankedInfoBySummonerId };
