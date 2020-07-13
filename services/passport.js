 const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => { //user is mongoose model instance and transformed into id which is passed on with the cookie
  done(null, user.id); //user id is the id given by mongo to a record
                      //mongo id is used to be consistent throughout all signing in methods
                      //After sign in profile id (Google id) does not come in play

});

passport.deserializeUser((id, done) => {
  //id is taken and transformed into mongoose model instance
  User.findById(id).then(user => {
    done(null, user);
  });
  //Pass in the id of the record we want to find
  //Async action, returns a promise
});

passport.use(new GoogleStrategy({
  clientID: keys.googleClientID,
  clientSecret: keys.googleClientSecret,
  callbackURL: '/auth/google/callback',
  proxy: true
},

 (accessToken, refreshToken, profile, done) => {
   //findOne searches DB to see if a record exists
   User.findOne({ googleId: profile.id }).then((existingUser) => {
        if(existingUser){
          // we already have a record with the given profile // ID
          done(null, existingUser);
        }
        else{
          //we don't  have a user profile ID, create new one
          new User({ googleId: profile.id }).save()
          .then(user => done(null, user));
        }
    });


 }
/*  console.log('access token',accessToken);
  console.log('refresh token',refreshToken);
  console.log('profile',profile);
  */
)
);
