Template.body.onCreated(function(){
  paper.install(window);
})

Template.drawingBoard.onRendered(function(){
  var saved = new Project('saved');
  var main = new Project('canvas');
  drawing = this.data;
  loadedData = drawing.drawingData;
  saved.importJSON(loadedData);
  main.activate()
  main.currentStyle = {
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
    var json = main.exportJSON();
    saved.importJSON(json);
    main.clear();
    saved.view.update();
    var drawingData = saved.exportJSON();
    Session.set('paths', drawingData);
    Meteor.call('drawingUpdate', drawing._id, drawingData, function(error, result){
      console.log(result);
    });
    main.activate();
  }

  Tracker.autorun(function () {
    
  });

});