Template.savedDrawing.onRendered(function(){
  var saved = new Project('saved-canvas');
  var paths = this.data.paths;
  for (var i = 0; i < paths.length; i++) {
    saved.importJSON(paths[i].json);
  };
  saved.view.update();
  var handle = paths.observe({
    added: function(path_data){
      saved.importJSON(path_data.json);
      saved.view.update();
    }
  });
});