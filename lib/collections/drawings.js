Drawings = new Mongo.Collection('drawings');

Meteor.methods({
  drawingInsert: function(drawingAttributes){
    check(drawingAttributes, {
      title: String,
      drawers: [String]
    });
    var currentUserId = this.userId
    var otherDrawers = _.reject(drawingAttributes.drawers, function(userId){ console.log(userId); console.log(currentUserId); return userId === currentUserId; });
    console.log(otherDrawers);
    var drawing = _.extend(drawingAttributes, {
      createdAt: new Date(),
      updatedAt: new Date()
    });
    var drawingId = Drawings.insert(drawing);
    for (var i = 0; i < otherDrawers.length; i++) {
      createNewDrawingNotification(otherDrawers[i], this.userId, drawingId);
    };
    return {
      _id: drawingId
    };
  }
});