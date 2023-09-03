import { getInfoBySummonerName, getRankedInfoBySummonerId } from './api';

export default async function bundleInfoBySummonerName(summonerName) {
  const summonerData = await getInfoBySummonerName(summonerName);
  const name = summonerData.name;
  const profileIconId = summonerData.profileIconId;

  const rankedData = await getRankedInfoBySummonerId(summonerData.id);
  const soloRank = findSoloRank(rankedData);

  return { name, profileIconId, soloRank };
}

function findSoloRank(rankedData) {
  let [tier, rank, leaguePoints] = ['', '', ''];

  const result = rankedData.find(
    (entry) => entry.queueType === 'RANKED_SOLO_5x5',
  );

  if (result === undefined) {
    tier = 'Unranked';
  } else {
    tier = result.tier;
    rank = result.rank;
    leaguePoints = result.leaguePoints;
  }

  return { tier, rank, leaguePoints };
}
