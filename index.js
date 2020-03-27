
const express = require('express');
require('./services/passport');
const authRoutes  = require('./routes/authRoutes');

const app = express();
mongoose.connect(keys.mongoURI);

authRoutes(app);

const PORT = process.env.PORT || 5000;    //For Heroku (prod env) || for development environment

app.listen(PORT);                 //Express telling node to listen to port 5000

                                  // localhost:5000
