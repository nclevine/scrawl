Meteor.publish('drawings', function(){
  return Drawings.find();
});

Meteor.publish('paths', function(){
  return Paths.find();
})

Meteor.publish('users', function(){
  return Meteor.users.find();
})

Meteor.publish("userProfile", function(username){
  var user = Meteor.users.findOne({username: username});
  if(!user){
    this.ready();
    return;
  }
  if(this.userId == user._id){
    return Meteor.users.find(this.userId);
  }
  else{
    return Meteor.users.find(user._id, {fields: {"profile":0}});
  }
});

Meteor.publish('friends', function(){
  return Friends.find();
})

Meteor.publish('notifications', function(){
  return Notifications.find({receiverId: this.userId, read: false});
})