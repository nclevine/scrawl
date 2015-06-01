Notifications = new Mongo.Collection('notifications');

createFriendRequestNotification = function(receiverId, requesterId){
  Notifications.insert({
    receiverId: receiverId,
    senderId: requesterId,
    createdAt: new Date(),
    read: false,
    type: 'friend request'
  })
};

createFriendAcceptanceNotification = function(receiverId, requesterId){
  Notifications.insert({
    receiverId: receiverId,
    senderId: requesterId,
    createdAt: new Date(),
    read: false,
    type: 'friend acceptance'
  })
};

createNewDrawingNotification = function(receiverId, creatorId, drawingId){
  Notifications.insert({
    receiverId: receiverId,
    senderId: creatorId,
    drawingId: drawingId,
    createdAt: new Date(),
    read: false,
    type: 'new drawing'
  })
}