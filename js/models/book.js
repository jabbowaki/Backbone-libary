var app = app || {};

app.Book = Backbone.Model.extend({
  defaults: {
    coverImage: 'img/index.png',
    title: 'No title',
    author: 'Unknown',
    releaseDate: 'Unknown',
    keywords: 'None'
  }

});