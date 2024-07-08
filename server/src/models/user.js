const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  provider: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  googleDisplayName: { type: String },
  password: { type: String },
});

module.exports = mongoose.model('User', UserSchema);
