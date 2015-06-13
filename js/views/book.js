//view for the individual book

var app = app || {};

app.BookView = Backbone.View.extend({
  tagName: 'div',
  className: 'bookContainer',
  template: _.template( $('#bookTemplate').html() ),

  events: {
    'click .delete' : 'deleteBook'
  },

  deleteBook: function() {
    //deletes the model
    this.model.destroy();
    //deletes the view
    this.remove();
  },

  render: function() {
    //from book -> this.el is what we defined in tagName.
    //use $el to get access to jQuery html() function
    this.$el.html( this.template( this.model.attributes ) );
    return this;
  }
});