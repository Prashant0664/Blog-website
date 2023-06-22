const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require("passport");
const keys = require("../config/keys")
const User = require('../models/User');



passport.use(new GoogleStrategy({
  clientID: keys.GOOGLE_CLIENT_ID,
  clientSecret: keys.GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback"
},
  (accessToken, refreshToken, profile, done) => {
    User.findOne({ googleId: profile.id }).then((existingUser) => {
      if (existingUser) {
        done(null, existingUser)
      } else {
        new User({ googleId: profile.id, email: profile.emails[0].value, picture: profile.photos[0].value, name: profile.displayName }).save().then((user) => {
          done(null, user)
        });
      }
    })
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user)
  })
})