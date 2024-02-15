// search by summoner name to get the summonerID
// https://developer.riotgames.com/apis#summoner-v4/GET_getBySummonerName
async function getInfoBySummonerName(summonerName) {
  try {
    const response = await fetch(
      `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${process.env.RIOT_API_KEY}`
    );
    const summonerData = await response.json();
    return summonerData;
  } catch (error) {
    // Fehler: Spieler nicht vorhanden.
    console.error('Summoner is not existing. (or API error)');
    return error;
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
    return rankedData;
  } catch (error) {
    console.error('Error!');
    return error;
  }
}

module.exports = { getInfoBySummonerName, getRankedInfoBySummonerId };
