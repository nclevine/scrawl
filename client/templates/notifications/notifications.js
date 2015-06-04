Template.notifications.helpers({
  notifications: function(){
    return Notifications.find({receiverId: Meteor.userId(), read: false});
  },
  notificationCount: function(){
    return Notifications.find({receiverId: Meteor.userId(), read: false}).count();
  }
});

Template.notifications.events({
  'click .show-notifications': function(event){
    event.preventDefault();
    if($(event.target).hasClass('closed')){  
      $('.notification-list').css('display', 'block');
      $(event.target).toggleClass('closed');
    } else{
      $('.notification-list').css('display', 'none');
      $(event.target).toggleClass('closed');
    };
  },
  'click .mark-notifications-read': function(event){
    Notifications.find({receiverId: Meteor.userId(), read: false}).map(function(document, index, cursor){
      Notifications.update(document._id, {$set: {read: true}});
    });
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
    if(this.type === 'new drawing'){
      return 'started a new drawing';
    } else if(this.type === 'friend request'){
      return 'requested to be friends';
    } else if(this.type === 'friend acceptance'){
      return 'accepted your friend request';
    };
  },
  notificationPath: function(){
    if(this.type === 'new drawing'){
      return '/drawings/' + this.drawingId;
    } else if(this.type === 'friend request' || this.type === 'friend acceptance'){
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
