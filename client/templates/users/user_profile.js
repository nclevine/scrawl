Template.userProfile.helpers({
  belongsTo: function(){
    return Meteor.userId() === this._id;
  },
  firstName: function(){
    if(this.profile && this.profile.firstName){
      return this.profile.firstName;
    } else{
      return '';
    };
  },
  lastName: function(){
    if(this.profile && this.profile.lastName){
      return this.profile.lastName;
    } else{
      return '';
    };
  },
  friends: function(){   
    if(this._id === Meteor.userId() && this.profile && this.profile.friends){
      var friends = []
      for (var i = 0; i < this.profile.friends.length; i++) {
        var friend = Meteor.users.findOne(this.profile.friends[i]);
        var name = '';
        if(friend.profile.firstName){
          name = friend.profile.firstName + ' ';
          if(friend.profile.lastName){
            name += friend.profile.lastName;
          };
        } else{
          name = friend.username;
        };
        friends.push({
          username: name,
          path: '/profile/' + friend.username
        });
      };
      return friends;
    } else{
      return false;
    };
  },
  drawings: function(){
    if(this._id === Meteor.userId()){

    } else if(_.contains(Meteor.user.friends, this._id)){

    } else{
      return false;
    }
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
  'click .add-friend': function(event){
    event.preventDefault();
    Meteor.users.update(this._id, {$addToSet: {'profile.friends': Meteor.userId()}});
    Meteor.users.update(Meteor.userId(), {$addToSet: {'profile.friends': this._id}});
  },
  'submit .profile-edit': function(event){
    event.preventDefault();
    var profile = {
      firstName: $(event.target).find('[name=first-name]').val(),
      lastName: $(event.target).find('[name=last-name]').val()
    }
    Meteor.users.update(Meteor.userId(), {$set: {profile: profile}});
  }
});