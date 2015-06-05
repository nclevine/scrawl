var notiHandle;

Template.header.onRendered(function(){
  var unreads = Notifications.find({receiverId: Meteor.userId(), read: false});
  notiHandle = unreads.observe({
    added: function(noti_data){
      $('.menu-button').css('background', 'rgba(56,99,255, 0.9)');
    },
    removed: function(noti_data){
      $('.menu-button').css('background', 'rgba(0, 81, 70, 0.9)');
    }
  });
});

Template.header.onDestroyed(function(){
  notiHandle.stop();
});

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
    if($('.menu-button').hasClass('closed')){
      $('.header').css('border-bottom', '2px #005146 solid');
    } else{
      $('.header').css('border-bottom', 'none');
    };
    $('.menu-button').toggleClass('closed');
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
    $('.header').css('border-bottom', 'none');
    Router.go('drawingsList');
  },
  'click .new-drawing-link': function(){
    $('.nav-menu').css('display', 'none');
  }
})