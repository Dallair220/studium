import { getInfoBySummonerName } from './api';
import { getRankedInfoBySummonerId } from './api';

export default async function bundleInfoBySummonerName(summonerName) {
  const summonerData = await getInfoBySummonerName(summonerName);
  console.log(summonerData);

  const rankedData = await getRankedInfoBySummonerId(summonerData.id);
  console.log(rankedData);

  return summonerName;
}
