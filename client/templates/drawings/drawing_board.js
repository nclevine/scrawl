Template.body.onCreated(function(){
  paper.install(window);
})

Template.drawingBoard.onRendered(function(){
  paper.setup('canvas');
  project.currentStyle = {
    strokeColor: 'black'
  }
  var tool = new Tool();
  tool.fixedDistance = 10;
  var path;
  tool.onMouseDown = function(event){
    console.log('mouse clicked!');
    path = new Path();
    path.add(event.point);
    path.strokeColor = 'black';
  }
  tool.onMouseDrag = function(event){
    console.log('mouse dragged!');
    path.add(event.point);
  }
});