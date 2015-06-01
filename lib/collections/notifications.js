Notifications = new Mongo.Collection('notifications');

createFriendRequestNotification = function(receiverId, requesterId){
  Notifications.insert({
    receiverId: receiverId,
    senderId: requesterId,
    createdAt: new Date(),
    read: false,
    type: 'friend request'
  })
}

createFriendAcceptanceNotification = function(receiverId, requesterId){
  Notifications.insert({
    receiverId: receiverId,
    senderId: requesterId,
    createdAt: new Date(),
    read: false,
    type: 'friend acceptance'
  })
}