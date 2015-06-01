Paths = new Mongo.Collection('paths');

Meteor.methods({
  pathInsert: function(pathJSON, drawingId, userId){
    var path = {
      json: pathJSON,
      drawingId: drawingId,
      userId: userId
    };

    var pathId = Paths.insert(path)

    return {
      _id: pathId
    };
  }
})