Template.notifications.helpers({
  notifications: function(){
    return Notifications.find({receiverId: Meteor.userId(), read: false});
  },
  notificationCount: function(){
    return Notifications.find({receiverId: Meteor.userId(), read: false}).count();
  }
});

Template.notificationItem.helpers({
  notificationSender: function(){
    var sender = Meteor.users.findOne(this.senderId);
    if(sender.profile && sender.profile.firstName){
      if(sender.profile.lastName){
        return sender.profile.firstName + ' ' + sender.profile.lastName;
      } else{
        return sender.profile.firstName;
      };
    } else{
      return sender.username;
    }
  },
  notificationMessage: function(){
    if(this.type === 'friend request'){
      return 'requested to be friends';
    } else if(this.type === 'friend acceptance'){
      return 'accepted your friend request';
    };
  },
  notificationPath: function(){
    if(this.type === 'friend request' || this.type === 'friend acceptance'){
      var username = Meteor.users.findOne(this.senderId).username;
      return '/profile/' + username;
    };
  }
});

Template.notificationItem.events({
  'click a': function(event){
    Notifications.update(this._id, {$set: {read: true}});
  }
})
