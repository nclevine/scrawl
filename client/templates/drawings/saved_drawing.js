Template.savedDrawing.helpers({
  canvasId: function(){
    return 'saved-canvas-' + this.drawing._id;
  }
});

var handle;

Template.savedDrawing.onRendered(function(){
  var canvasId = 'saved-canvas-' + this.data.drawing._id;
  var saved = new Project(canvasId);
  var paths = this.data.paths;
  for (var i = 0; i < paths.length; i++) {
    saved.importJSON(paths[i].json);
  };
  saved.view.update();
  handle = paths.observe({
    added: function(path_data){
      saved.importJSON(path_data.json);
      saved.view.update();
    }
  });

});

Template.savedDrawing.onDestroyed(function(){
  handle.stop();
})
