Template.userProfile.onRendered(function(){
  $('.nav-menu').css({
    display: 'none',
    borderBottom: 'none'
  });
  if(!$('.menu-button').hasClass('closed')){
    $('.menu-button').toggleClass('closed');
  };
  $('.notification-list').css('display', 'none');
  if(!$('.show-notifications').hasClass('closed')){
    $('.show-notifications').toggleClass('closed');
  };
});

Template.userProfile.helpers({
  belongsTo: function(){
    return Meteor.userId() === this._id;
  },
  friendStatus: function(){
    var friends = Friends.findOne({userId: Meteor.userId()});
    if(_.contains(friends.friends, this._id)){
      return "<i class='fa fa-star'></i> You are friends";
    } else if(_.contains(friends.sentRequestTo, this._id)){
      return 'Friend Request Sent';
    } else if(_.contains(friends.receivedRequestFrom, this._id)){
      return 'Friend Request Received';
    } else{
      return false;
    };
  },
  areFriends: function(){
    var friends = Friends.findOne({userId: Meteor.userId()});
    if(_.contains(friends.friends, this._id)){
      return true;
    } else{
      return false;
    }
  },
  requestReceived: function(){
    var friends = Friends.findOne({userId: Meteor.userId()});
    if(_.contains(friends.receivedRequestFrom, this._id)){
      return true;
    } else{
      return false;
    };
  },
  firstName: function(){
    return this.profile.firstName;
  },
  lastName: function(){
    return this.profile.lastName;
  },
  isPrivate: function(){
    if(this.profile.private){
      return 'checked';
    } else{
      return '';
    };
  },
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
      var friendsDrawings = Drawings.find({drawers: friend._id}).fetch()
      var sharedDrawings = _.filter(friendsDrawings, function(drawing){
        return _.contains(drawing.drawers, Meteor.userId());
      });
      var drawingsCount = sharedDrawings.length;
      friendsInfo.push({
        name: name,
        drawingsCount: drawingsCount,
        path: '/profile/' + friend.username
      });
    };
    return friendsInfo;
  },
  drawings: function(){
    var count = Drawings.find({drawers: this._id, $or: [{private: false}, {drawers: Meteor.userId()}]}, {sort: {createdAt: -1}}).count();
    if(count > 0){
      return Drawings.find({drawers: this._id, $or: [{private: false}, {drawers: Meteor.userId()}]}, {sort: {createdAt: -1}});
    } else{
      return false;
    };
  },
  isOneDrawing: function(){
    return Drawings.find({drawers: this._id, private: false}).count() === 1;
  }
});

Template.userProfile.events({
  'click .profile-edit-button': function(event){
    event.preventDefault();
    if($(event.target).hasClass('cancel-profile-edit')){
      $('.profile-edit').css('display', 'none');
      $(event.target).text('Edit Profile');
    } else{
      $('.profile-edit').css('display', 'block');
      $(event.target).text('Cancel');
    }
    $(event.target).toggleClass('cancel-profile-edit')
  },
  'submit .profile-edit': function(event){
    event.preventDefault();
    var profile = {
      firstName: $(event.target).find('[name=first-name]').val(),
      lastName: $(event.target).find('[name=last-name]').val(),
      private: $(event.target).find('[name=private]').prop('checked')
    }
    Meteor.users.update(Meteor.userId(), {$set: {profile: profile}});
    $('.profile-edit').css('display', 'none');
    $('.profile-edit-button').toggleClass('cancel-profile-edit');
    $('.profile-edit-button').text('Edit Profile');
  },
  'click .add-friend': function(event){
    event.preventDefault();
    Meteor.call('requestFriend', this._id);
  },
  'click .accept-friend-request': function(event){
    event.preventDefault();
    Meteor.call('acceptFriendRequest', this._id)
  },
  'click .remove-friend': function(event){
    event.preventDefault();
    Meteor.call('removeFriend', this._id);
  },
  'click .start-drawing': function(event){
    event.preventDefault();
    if($(event.target).hasClass('closed')){
      $(event.target).text('Cancel');
    } else{
      $(event.target).text('Draw together');
    };
    $('.new-friend-drawing').toggle();
    $(event.target).toggleClass('closed');
  },
  'submit .new-friend-drawing-form': function(event){
    event.preventDefault();
    var drawers = [this._id, Meteor.userId()];
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
  }
});