//loads the module dependencies
var application_root = __dirname,
  express = require('express'), //framework making the http server
  bodyParser = require('body-parser'), //Parser for reading request body
  path = require('path'), //Utilities for dealing with file path
  mongoose = require('mongoose'); //MongoDB

//Creates server
var app = express();

//Where to serve static content
app.use( express.static( path.join( application_root, 'site') ) );
app.use(bodyParser());

//Routes
// app.get('/api', function(request, response) {
//   response.send('library api is running!');
// });
//start server
var port = 4711;

app.listen(port, function() {
  console.log('express server now listening on port %d in %s mode', port, app.settings.env);
});
//makes site viewable on localhost:4711/api
app.get('/api', function (req, res) {
  res.send("Yo this works");
});

