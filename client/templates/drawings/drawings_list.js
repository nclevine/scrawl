Template.drawingsList.helpers({
  drawings: function(){
    return Drawings.find({drawers: Meteor.userId()});
  }
});

Template.drawingItem.helpers({
  otherDrawers: function(){
    var drawerNames = [];
    var otherDrawers = _.reject(this.drawers, function(userId){ return userId == Meteor.userId(); })
    for (var i = 0; i < otherDrawers.length; i++) {
      var user = Meteor.users.findOne(otherDrawers[i]);
      var name = user.username;
      if(user.profile && user.profile.firstName){
        if(user.profile.lastName){
          name = user.profile.firstName + ' ' + user.profile.lastName;
        } else{
          name = user.profile.firstName;
        };
      };
      drawerNames.push({
        name: name,
        path: '/profile/' + user.username
      });
    };
    return drawerNames;
  }
})