Template.header.helpers({
  profilePath: function(){
    return '/profile/' + Meteor.user().username;
  }
})