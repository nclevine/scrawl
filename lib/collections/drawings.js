Drawings = new Mongo.Collection('drawings');

Meteor.methods({
  drawingInsert: function(drawingAttributes){
    check(drawingAttributes, {
      title: String,
      drawers: [String]
    });

    var drawing = _.extend(drawingAttributes, {
      createdAt: new Date(),
      updatedAt: new Date()
    });

    var drawingId = Drawings.insert(drawing);

    return {
      _id: drawingId
    };
  }
});