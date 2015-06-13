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
    scope = new paper.PaperScope();
    scope.activate();
    var canvasId = 'working-canvas-' + this.data.drawing._id;
    working = new Project(canvasId);
    var drawing = this.data.drawing;
    working.activate();
    working.currentStyle = {
      strokeColor: 'black',
      strokeWidth: 3,
      strokeJoin: 'round',
      strokeCap: 'round'
    };
    pencil = new Tool();
    pencil.minDistance = 5;
    pencil.maxDistance = 10;
    var path;
    pencil.onMouseDown = function(event){
      path = new Path();
      path.add(event.point);
    };
    pencil.onMouseDrag = function(event){
      path.add(event.point);
    };
    pencil.onMouseUp = onMouseUp;

    hatch = new Tool();
    hatch.fixedDistance = 5;
    hatch.onMouseDrag = function(event){
      var hatchPath = new Path();
      hatchPath.strokeWidth = 2;
      hatchPath.strokeCap = 'butt';
      var vector = event.delta;
      vector.angle += 90;
      vector.length = working.currentStyle.strokeWidth;
      hatchPath.add(event.middlePoint.add(vector));
      hatchPath.add(event.middlePoint.subtract(vector));
    }
    hatch.onMouseUp = onMouseUp;

    dots = new Tool()
    dots.onMouseDown = function(event){
      dots.fixedDistance = working.currentStyle.strokeWidth * 2;
    }
    dots.onMouseDrag = function(event) {
      var circle = new Path.Circle({
        center: event.middlePoint,
        radius: event.delta.length / 4
      });
      circle.fillColor = working.currentStyle.strokeColor;
    }
    dots.onMouseUp = onMouseUp;

    pencil.activate();

    function onMouseUp(event){
      var json = working.exportJSON();
      working.clear();
      Meteor.call('pathInsert', json, drawing._id, Meteor.userId(), function(error, result){
      });
      working.activate();
    }
  };
});