Friends = new Mongo.Collection('friends');

Meteor.methods({
  requestFriend: function(friendId){
    Friends.update({userId: this.userId}, {$addToSet: {sentRequestTo: friendId}});
    Friends.update({userId: friendId}, {$addToSet: {receivedRequestFrom: this.userId}});
    createFriendRequestNotification(friendId, this.userId);
  },
  acceptFriendRequest: function(friendId){
    Friends.update({userId: this.userId}, {$addToSet: {friends: friendId}});
    Friends.update({userId: this.userId}, {$pull: {receivedRequestFrom: friendId}});
    Friends.update({userId: friendId}, {$addToSet: {friends: this.userId}});
    Friends.update({userId: friendId}, {$pull: {sentRequestTo: this.userId}});
    createFriendAcceptanceNotification(friendId, this.userId);
  }
});