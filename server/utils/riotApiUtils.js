// Get the account's PUUID by riotId (gameName and tagLine)
async function getAccountByRiotId(gameName, tagLine) {
  try {
    const response = await fetch(
      `https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}?api_key=${process.env.RIOT_API_KEY}`
    );
    const accountData = await response.json();
    if (accountData.status?.status_code === 404) {
      throw new Error('Player not found');
    }
    if (!response.ok) {
      throw new Error(accountData.status.message);
    }
    return accountData;
  } catch (error) {
    throw new Error(error.message || 'Something went wrong');
  }
}

// Get the summoner's information by their PUUID (such as summonerLevel, profileIconId, etc.)
async function getSummonerByPuuid(puuid) {
  try {
    const response = await fetch(
      `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}?api_key=${process.env.RIOT_API_KEY}`
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

// Get the summoner's ranked information by their id
async function getRankedInfoByPuuid(id) {
  try {
    const response = await fetch(
      `https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}?api_key=${process.env.RIOT_API_KEY}`
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

module.exports = { getAccountByRiotId, getSummonerByPuuid, getRankedInfoByPuuid };
