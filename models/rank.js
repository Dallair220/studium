const mongoose = require('mongoose');

const RankSchema = new mongoose.Schema({
  rank: {
    type: String,
    required: true,
    default: 'UNRANKED',
    enum: [
      'UNRANKED',
      'IRON',
      'BRONZE',
      'SILVER',
      'GOLD',
      'PLATINUM',
      'EMERALD',
      'DIAMOND',
      'MASTER',
      'GRANDMASTER',
      'CHALLENGER',
    ],
  }, // soloRank.tier
  division: { type: String, required: true, enum: ['I', 'II', 'III', 'IV'] }, // soloRank.rank
  leaguePoints: { type: Number, required: true },
  wins: { type: Number, required: true },
  losses: { type: Number, required: true },
});

RankSchema.virtual('winRate').get(function () {
  return this.wins / (this.wins + this.losses);
});

RankSchema.virtual('rankDisplay').get(function () {
  return `${this.rank} ${this.division} (${this.leaguePoints} LP)`;
});

module.exports = mongoose.model('Rank', RankSchema);
