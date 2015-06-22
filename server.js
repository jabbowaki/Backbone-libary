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

//Connects to MongoDB
mongoose.connect('mongodb://localhost/library_database');

//Schema Design
var Book = new mongoose.Schema({
  title: String,
  author: String,
  releaseDate: Date
});

//Models
var BookModel = mongoose.model('Book', Book);
//Get a list of all books or throw error
app.get( '/api/books', function( request, response ) {
    return BookModel.find( function( err, books ) {
        if( !err ) {
            return response.send( books );
        } else {
            return console.log( err );
        }
    });
});

//add a new book
app.post('/api/books', function(request, response){
  var book = new BookModel({
    title: request.body.title,
    author: request.body.author,
    releaseDate: request.body.releaseDate
  });
  book.save(function(error) {
    if (!error) {
      console.log('created');
      return response.send(book);
    } else{
      console.log(error);
    }
  });
});


//update a book
app.put('/api/books/:id', function(request, response){
  console.log('Updating book ' + request.book.title);
  return BookModel.findById(request.params.id, function(err, book){
    book.title = request.body.title;
    book.author = request.body.author;
    book.releaseDate = request.body.releaseDate;

    return book.save(function(err){
      if (!err) {
        console.log('book updated');
        return response.send(book);
      }else {
        console.log(err);
      }
    });
  });
});

//get a single book by id
app.get('/api/books/:id', function(request, response) {
  return BookModel.findById( request.params.id, function(err, book) {
    if(!err){
      return response.send(book);
    } else {
      return console.log(err);
    }
  });
});

//delete it! DELETE IT NOW!
app.delete('/api/books/:id', function(request, response) {
  console.log('Deleting book wiht id: ' + request.params.id);
  return BookModel.findById(request.params.id, function(err, book){
    return book.remove(function(err){
      if (!err){
        console.log('Book has been terminated');
      } else{
        console.log(err);
      }
    });
  });
});

//Configure server
app.configure(function() {
  //parses request body, populated request.body
  app.use(express.bodyParser());
  //checks request.body for HTTP method & overrides
  app.use(express.methodOverride());
  //perform route lookup based on url and HTTP method
  app.use(app.router);
  //Where to serve static content aka index.html
  app.use(express.static(path.join(application_root, 'site')));
  //show all errors in development
  app.use(express.errorHandler({dumpExceptions: true, showStack: true}));
});



