Meteor.publish('drawings', function(){
  return Drawings.find();
});

Meteor.publish('paths', function(){
  return Paths.find();
})

Meteor.publish('users', function(){
  return Meteor.users.find();
})
