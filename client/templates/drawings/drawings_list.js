Template.drawingsList.helpers({
  drawings: function(){
    return Drawings.find({drawers: Meteor.userId()}, {sort: {createdAt: -1}});
  }
});

Template.drawingItem.helpers({
  otherDrawers: function(){
    var drawerNames = [];
    for (var i = 0; i < this.drawers.length; i++) {
      if(this.drawers[i] === Meteor.userId()){
        drawerNames.push({name: 'You', path: '/profile/' + Meteor.user().username});
      } else{
        var user = Meteor.users.findOne(this.drawers[i]);
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
    };
    return drawerNames;
  },
  timeAgo: function(){
    return moment(this.createdAt).fromNow();
  }
})