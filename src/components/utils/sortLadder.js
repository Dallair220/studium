const TIER_VALUE = {
  UNRANKED: 0,
  IRON: 1,
  BRONZE: 2,
  SILVER: 3,
  GOLD: 4,
  PLATINUM: 5,
  EMERALD: 6,
  DIAMOND: 7,
  MASTER: 8,
  GRANDMASTER: 9,
  CHALLENGER: 10,
};
const RANK_VALUE = {
  IV: 1,
  III: 2,
  II: 3,
  I: 4,
};

export default function sortLadder(ladderList) {
  ladderList.sort((playerA, playerB) => {
    // compare tier rank first
    if (TIER_VALUE[playerA.soloRank.tier] > TIER_VALUE[playerB.soloRank.tier])
      return -1;
    if (TIER_VALUE[playerA.soloRank.tier] < TIER_VALUE[playerB.soloRank.tier])
      return 1;

    // if tier rank is the same, check for division
    if (RANK_VALUE[playerA.soloRank.rank] > RANK_VALUE[playerB.soloRank.rank])
      return -1;
    if (RANK_VALUE[playerA.soloRank.rank] < RANK_VALUE[playerB.soloRank.rank])
      return 1;

    // if division is the same, check for LP
    if (playerA.soloRank.leaguePoints > playerB.soloRank.leaguePoints)
      return -1;
    if (playerA.soloRank.leaguePoints < playerB.soloRank.leaguePoints) return 1;

    // if LP is the same as well, don't change sorting order
    return 0;
  });

  return ladderList;
}
