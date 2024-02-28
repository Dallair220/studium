const passport = require('passport');
const User = require('../models/user');
require('./passportLocalStrategy');
require('./passportGoogleOAuth2Strategy');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});
