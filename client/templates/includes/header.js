Template.header.helpers({
  username: function(){
    return Meteor.user().username;
  },
  profilePath: function(){
    return '/profile/' + Meteor.user().username;
  }
});

Template.header.events({
  'click .menu-button': function(event){
    event.preventDefault();
    $('.nav-menu').toggle();
  },
  'click .username': function(event){
    $('.nav-menu').toggle();
  },
  'click .recent-drawings': function(event){
    $('.nav-menu').toggle();
  },
  'click .discover-users': function(event){
    $('.nav-menu').toggle();
  },
  'click .log-out': function(event){
    event.preventDefault();
    Meteor.logout();
    $('.nav-menu').toggle();
    Router.go('drawingsList');
  },
  'click .new-drawing-link': function(){
    $('.nav-menu').css('display', 'none');
  }
})