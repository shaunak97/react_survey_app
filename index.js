const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');


mongoose.connect(keys.mongoURI);

const app = express();

require('./routes/authRoutes')(app);


const PORT = process.env.PORT || 5000;    //For Heroku (prod env) || for development environment

app.listen(PORT);                 //Express telling node to listen to port 5000

                                  // localhost:5000
