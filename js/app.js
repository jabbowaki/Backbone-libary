var app = app || {};

$(function() {
  //sample data
  var books = [
    {title: 'The Art of Thinking Clearly', author: 'Rolf Dobelli', releaseDate: '2013', keywords: "Marcos' choice"},
    {title: 'Appetite For Reduction', author: 'Isa Chandra Moskowitz', releaseDate: '2012', keywords: 'Cookbooks'},
    {title: 'Javascript The Good Parts', author: 'Douglas Crockford', releaseDate: '2008', keywords: 'Javascript Programming'}
  ];

  //passes our sample data into a new LibraryView
  new app.LibraryView(books);
});