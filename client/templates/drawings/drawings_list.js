Template.drawingsList.helpers({
  drawings: function(){
    var count = Drawings.find({drawers: Meteor.userId()}, {sort: {createdAt: -1}}).count();
    if(count > 0){
      return Drawings.find({drawers: Meteor.userId()}, {sort: {createdAt: -1}});
    } else{
      return false;
    };
  }
});

Template.drawingItem.onRendered(function(){
  $('svg').attr({
    viewbox: '0 0 80 142',
    preserveAspectRatio: "xMinYMin meet"
    // width: 80,
    // height: 142
  });
});

Template.drawingItem.helpers({
  drawerNames: function(){
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
  },
  thumbnail: function(){
    if(this.svg){
      console.log(this.svg);
      return this.svg;
    } else{
      return false;
    };
  }
})