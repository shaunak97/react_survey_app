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

async (accessToken, refreshToken, profile, done) => {
   //findOne searches DB to see if a record exists
  const existingUser = await User.findOne({ googleId: profile.id })

  if(existingUser){
    // we already have a record with the given profile // ID
    return done(null, existingUser);
  }
    //we don't  have a user profile ID, create new one
    const user = await  new User({ googleId: profile.id }).save()
    done(null, user);
 }

 
/*  console.log('access token',accessToken);
  console.log('refresh token',refreshToken);
  console.log('profile',profile);
  */
)
);
