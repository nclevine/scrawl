Template.body.onCreated(function(){
  paper.install(window);
})

Template.drawingBoard.onRendered(function(){
  var saved = new Project('saved-canvas');
  var working = new Project('working-canvas');
  drawing = this.data;
  loadedData = drawing.drawingData;
  saved.importJSON(loadedData);
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
    saved.importJSON(json);
    working.clear();
    saved.view.update();
    var drawingData = saved.exportJSON();
    Session.set('paths', drawingData);
    Meteor.call('drawingUpdate', drawing._id, drawingData, function(error, result){
      console.log(result);
    });
    working.activate();
  }
});