
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser'); //Express middleware that operates on the incoming requests
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

if( process.env.NODE_ENV === 'production' ){
  //Express will serve up production assets
  //Like our main.js file or main.css file
  app.use(express.static('client/build'));

  //Express will serve up the index.html file
  //If it doesn't recognize the file
  const path = require('path');
  app.get('*',(req,res) => {
    res.sendFile(path.resolve(_dirname,'client','build','index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);



/*
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session'); // gives access to cookies
const passport = require('./config/keys'); //tells express to use cookies in application
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');


mongoose.connect(keys.mongoURI);

const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, //cookie lasts for 30 days in browser
    keys: [keys.cookieKey] //used to encrypt cookie
  })
);

app.use(passport.initialize());
app.use(passport.session());


require('./routes/authRoutes')(app);


const PORT = process.env.PORT || 5000;    //For Heroku (prod env) || for development environment

app.listen(PORT);                 //Express telling node to listen to port 5000

                                  // localhost:5000


*/
