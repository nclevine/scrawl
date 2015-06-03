Template.drawingCreate.helpers({
  friends: function(){   
    var friends = Friends.findOne({userId: Meteor.userId()}).friends;
    var friendsInfo = []
    for (var i = 0; i < friends.length; i++) {
      var friend = Meteor.users.findOne(friends[i]);
      var name = friend.username;
      if(friend.profile && friend.profile.firstName){
        if(friend.profile.lastName){
          name = friend.profile.firstName + ' ' + friend.profile.lastName;
        } else{
          name = friend.profile.firstName;
        };
      };
      friendsInfo.push({
        name: name,
        _id: friend._id
      });
    };
    return friendsInfo;
  }
});

Template.drawingCreate.events({
  'submit form': function(event){
    event.preventDefault();
    var drawers = $(event.target).find('[name=friends]').val() || [];
    drawers.push(Meteor.userId());
    var drawing = {
      title: $(event.target).find('[name=title]').val(),
      drawers: drawers,
      private: $(event.target).find('[name=private]').prop('checked')
    };
    if(!drawing.title){
      $('.failure').text('Drawing must have a title');
      $('.failure').css('display', 'block');
    } else if(drawing.drawers.length <= 1){
      $('.failure').text('You must pick someone to draw with');
      $('.failure').css('display', 'block');
    } else{
      $('.failure').css('display', 'none');
      Meteor.call('drawingInsert', drawing, function(error, result){
        Router.go('drawingPage', {_id: result._id});
      });
    }
  },
  'click .random-drawing': function(event){
    event.preventDefault();
    var randomUserId = _.sample(Meteor.users.find({_id: {$ne: Meteor.userId()}, 'profile.private': false}).fetch())._id;
    var drawing = {
      title: 'Random Drawing',
      drawers: [randomUserId, Meteor.userId()],
      private: false
    };
    Meteor.call('drawingInsert', drawing, function(error, result){
      Router.go('drawingPage', {_id: result._id});
    });
  }
})