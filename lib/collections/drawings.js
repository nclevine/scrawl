Drawings = new Mongo.Collection('drawings');

Meteor.methods({
  drawingInsert: function(drawingAttributes){
    check(drawingAttributes, {
      title: String,
      drawers: [String]
    });

    var drawing = _.extend(drawingAttributes, {
      createdAt: new Date(),
      updatedAt: new Date(),
      drawingData: ''
    });

    var drawingId = Drawings.insert(drawing);

    return {
      _id: drawingId
    };
  },
  drawingUpdate: function(drawingId, drawingData){
    Drawings.update(drawingId, {$set: {drawingData: drawingData}});
    return {
      _id: drawingId
    };
  }
});