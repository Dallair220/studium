// key expires within 24 hours
const DEV_API_KEY = 'RGAPI-ea79066d-748b-42fd-96cb-57632abc6a68';
const TEST_SUMMONERNAME = 'Stef';

// search by summoner name to get the summonerID
// https://developer.riotgames.com/apis#summoner-v4/GET_getBySummonerName
async function getInfoBySummonerName(summonerName) {
  try {
    const response = await fetch(
      `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${DEV_API_KEY}`,
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
async function getRankedInfoBySummonerId(summonerId) {
  try {
    const response = await fetch(
      `https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}?api_key=${DEV_API_KEY}`,
    );
    const rankedData = await response.json();
    return rankedData;
  } catch (error) {
    console.log('Error!');
    return error;
  }
}

// test both API calls
async function testCall() {
  const summonerData = await getInfoBySummonerName(TEST_SUMMONERNAME);
  console.log(summonerData);

  const rankedData = await getRankedInfoBySummonerId(summonerData.id);
  console.log(rankedData);
}

export default testCall;
