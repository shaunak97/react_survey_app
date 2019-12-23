const express = require('express');
const app = express();

app.get('/', (req, res) => {      //app- Express app to register this route handler with
  res.send({ hi: 'there' });      //'/' - Watch for requests trying to access '/'
})                                // req - Object representing incoming request

const PORT = process.env.PORT || 5000;    //For Heroku (prod env) || for development environment
                                  // res - Object " " outgoing response
app.listen(PORT);                 // res.send - Send some JSON back
                                  //Express telling node to listen to port 5000

                                  // localhost:5000
