Template.body.onCreated(function(){
  paper.install(window);
})

Template.workingDrawing.helpers({
  canvasId: function(){
    return 'working-canvas-' + this.drawing._id;
  }
});

Template.workingDrawing.onRendered(function(){
  if(_.contains(this.data.drawing.drawers, Meteor.userId())){
    var scope = new paper.PaperScope();
    scope.activate();
    var canvasId = 'working-canvas-' + this.data.drawing._id;
    working = new Project(canvasId);
    var drawing = this.data.drawing;
    working.activate();
    working.currentStyle = {
      strokeColor: 'black'
    }
    var pencil = new Tool();
    pencil.fixedDistance = 10;
    var path;
    pencil.onMouseDown = function(event){
      path = new Path();
      path.add(event.point);
    };
    pencil.onMouseDrag = function(event){
      path.add(event.point);
    };
    pencil.onMouseUp = onMouseUp;

    function onMouseUp(event){
      var json = working.exportJSON();
      working.clear();
      Meteor.call('pathInsert', json, drawing._id, Meteor.userId(), function(error, result){
      });
      working.activate();
    }
  };
});