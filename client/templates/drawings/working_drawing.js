Template.body.onCreated(function(){
  paper.install(window);
})

Template.workingDrawing.onRendered(function(){
  var working = new Project('working-canvas');
  var drawing = this.data.drawing;
  working.activate()
  working.currentStyle = {
    strokeColor: 'black'
  }
  var pencil = new Tool();
  pencil.fixedDistance = 10;
  var path;
  pencil.onMouseDown = function(event){
    path = new Path();
    path.add(event.point);
    path.strokeColor = 'black';
  }
  pencil.onMouseDrag = function(event){
    path.add(event.point);
  }
  pencil.onMouseUp = function(event){
    var json = working.exportJSON();
    working.clear();
    console.log(json);
    console.log(drawing._id);
    console.log(Meteor.userId());
    Meteor.call('pathInsert', json, drawing._id, Meteor.userId(), function(error, result){
      console.log(result);
    });
    working.activate();
  }
});