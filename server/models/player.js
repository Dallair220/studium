const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema({
  gameName: { type: String, required: true, minLength: 3, maxLength: 23 },
  tagLine: { type: String, required: true, minLength: 3, maxLength: 5 },
  profileIconId: { type: Number, required: true },
  rank: { type: mongoose.Schema.Types.ObjectId, ref: 'Rank', required: true },
  createdByUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  lastUpdated: { type: Date, required: true, default: Date.now },
});

module.exports = mongoose.model('Player', PlayerSchema);
