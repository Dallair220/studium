const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const User = require('../models/user');

// If the environment variables are not set, the Google strategy will not be used
if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) return;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.DOMAIN || 'http://localhost:3000'}/auth/google/callback`,
      passReqToCallback: true,
    },
    async (request, accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ email: profile.email });

        if (!user) {
          user = await User.create({
            provider: 'google',
            email: profile.email,
            googleDisplayName: profile.displayName,
          });
        }
        if (user.provider !== 'google') {
          throw new Error('Email is already registered with another provider');
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);
