//view for the book list (aka library collection)

var app = app || {};

app.LibraryView = Backbone.View.extend({
  el: '#books',

//takes an array of data and passes it to app.Library
  initialize: function(initialBooks) {
    this.collection = new app.Library(initialBooks);
    //listens for the addBook event and updates if it happens
    this.listenTo(this.collection, 'add', this.renderBook);
    this.render();
  },

  events: {
    'click #add' : 'addBook'
  },

  addBook: function(event) {
    event.preventDefault();

    var formInfo = {};
    //gets the form inputs. If input isn't blank, it sets as value inside formInfo object
    $('#addBook div').children('input').each(function(i, el) {
      if($(el).val() !== ''){
        formInfo[el.id] = $(el).val();
      }
    });
    this.collection.add(new app.Book(formInfo));
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