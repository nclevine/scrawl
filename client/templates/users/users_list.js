Template.usersList.helpers({
  users: function(){
    return Meteor.users.find({_id: {$ne: Meteor.userId()}, 'profile.private': false});
  }
});

Template.userItem.helpers({
  drawingsCount: function(){
    return Drawings.find({drawers: this._id, private: false}).count();
  },
  firstName: function(){
    return this.profile.firstName;
  },
  lastName: function(){
    return this.profile.lastName;
  },
  path: function(){
    return '/profile/' + this.username;
  }
})