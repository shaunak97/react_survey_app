const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys');

const app = express();

passport.use(new GoogleStrategy({
  clientID: keys.googleClientID,
  clientSecret: keys.googleClientSecret,
  callbackURL: '/auth/google/callback'
}, (accessToken) => {
  console.log(accessToken);
}
)
);

app.get('/auth/google',
passport.authenticate('google',{
  scope: ['profile','email']
})
);


const PORT = process.env.PORT || 5000;    //For Heroku (prod env) || for development environment

app.listen(PORT);                 //Express telling node to listen to port 5000

                                  // localhost:5000
