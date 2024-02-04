#! /usr/bin/env node

require('dotenv').config();
const mongoose = require('mongoose');

const Player = require('./models/player');
const Rank = require('./models/rank');

const players = [];
const ranks = [];

// MongoDB connection
mongoose.set('strictQuery', false);
async function main() {
  await mongoose.connect(process.env.MONGODB_CONNECTION_URI);
  await createRanks();
  await createPlayers();
  mongoose.connection.close();
}
main().catch((err) => console.log(err));

async function rankCreate(index, rank, division, leaguePoints, wins, losses, gamesPlayed) {
  const rankDetail = { rank, division, leaguePoints, wins, losses, gamesPlayed };
  const rankInstance = new Rank(rankDetail);
  await rankInstance.save();
  ranks[index] = rankInstance;
  console.log(`Added rank: ${rankInstance.rankDisplay}`);
}

async function playerCreate(index, gameName, tagLine, rank) {
  const playerDetail = { gameName, tagLine, rank };
  const player = new Player(playerDetail);
  await player.save();
  players[index] = player;
  console.log(`Added player: ${gameName} #${tagLine}`);
}

async function createRanks() {
  await Promise.all([
    rankCreate(0, 'GOLD', 'III', 70, 30, 20, 50),
    rankCreate(1, 'PLATINUM', 'IV', 90, 40, 30, 70),
    rankCreate(2, 'DIAMOND', 'I', 100, 50, 40, 90),
  ]);
}

async function createPlayers() {
  await Promise.all([
    playerCreate(0, 'PlayerOne', 'EUW', ranks[0]),
    playerCreate(1, 'PlayerTwo', 'EUW', ranks[1]),
    playerCreate(2, 'PlayerThree', 'EUW', ranks[2]),
  ]);
}
