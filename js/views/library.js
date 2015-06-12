//view for the book list (aka library collection)

var app = app || {};

app.LibraryView = Backbone.View.extend({
  el: '#books',

//takes an array of data and passes it to app.Library
  initialize: function(initialBooks) {
    this.collection = new app.Library(initialBooks);
    this.render();
  },

  //render library by rendering each book in the collection
  render: function() {
    this.collection.each(function(item) {
      this.renderBook(item);
    }, this);
  },

  //render a book by creating a bookView and appending the element it renders to the library's element
  renderBook: function(item) {
    var bookView = new app.BookView({
      model: item
    });
    this.$el.append(bookView.render().el);
  }
});