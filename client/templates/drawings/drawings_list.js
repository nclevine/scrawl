Template.drawingsList.helpers({
  drawings: function(){
    return Drawings.find({drawers: Meteor.userId()});
  }
});

Template.drawingItem.helpers({
  usernames: function(){
    var usernames = [];
    for (var i = 0; i < this.drawers.length; i++) {
      var user = Meteor.users.findOne(this.drawers[i]);
      console.log(user.username);
      usernames.push(user.username);
      console.log(usernames);
    };
    console.log(usernames);
    return usernames;
  }
})