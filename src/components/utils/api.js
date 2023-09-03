import getRiotDevAPIKey from './dev_key';

// search by summoner name to get the summonerID
// https://developer.riotgames.com/apis#summoner-v4/GET_getBySummonerName
export async function getInfoBySummonerName(summonerName) {
  try {
    const response = await fetch(
      `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${getRiotDevAPIKey()}`,
    );
    const summonerData = await response.json();
    return summonerData;
  } catch (error) {
    console.log('Error!');
    return error;
  }
}

// use summonerID to get ranked information (for the ladder)
// https://developer.riotgames.com/apis#league-v4/GET_getLeagueEntriesForSummoner
export async function getRankedInfoBySummonerId(summonerId) {
  try {
    const response = await fetch(
      `https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}?api_key=${getRiotDevAPIKey()}`,
    );
    const rankedData = await response.json();
    return rankedData;
  } catch (error) {
    console.log('Error!');
    return error;
  }
}
