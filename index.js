const express = require('express');
require('./services/passport');


const app = express();

require('./routes/authRoutes')(app);

//const mongoose = require('mongoose');
const keys = require('./config/keys');

//mongoose.connect(keys.mongoURI);





const PORT = process.env.PORT || 5000;    //For Heroku (prod env) || for development environment

app.listen(PORT);                 //Express telling node to listen to port 5000

                                  // localhost:5000
