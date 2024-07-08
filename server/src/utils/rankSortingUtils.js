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

// Sort a list of players in descending order based on their game rank.
function sortLadder(ladderList) {
  ladderList.sort((playerA, playerB) => {
    // compare tier rank first
    if (TIER_VALUE[playerA.rank.rank] > TIER_VALUE[playerB.rank.rank]) return -1;
    if (TIER_VALUE[playerA.rank.rank] < TIER_VALUE[playerB.rank.rank]) return 1;

    // if tier rank is the same, check for division
    if (RANK_VALUE[playerA.rank.division] > RANK_VALUE[playerB.rank.division]) return -1;
    if (RANK_VALUE[playerA.rank.division] < RANK_VALUE[playerB.rank.division]) return 1;

    // if division is the same, check for LP
    if (playerA.rank.leaguePoints > playerB.rank.leaguePoints) return -1;
    if (playerA.rank.leaguePoints < playerB.rank.leaguePoints) return 1;

    // if LP is the same as well, don't change sorting order
    return 0;
  });

  return ladderList;
}

module.exports = sortLadder;
