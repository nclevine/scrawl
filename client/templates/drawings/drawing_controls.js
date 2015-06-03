var shakeShowTools;

Template.drawingControls.onRendered(function(){
  colors = new Project('color-picker');
  var colorWheel = new Raster('color-wheel', colors.view.center);
  colorPicker = new Tool()
  colorPicker.onMouseDown = pickColor;
  colorPicker.onMouseDrag = pickColor;
  function pickColor(event){
    var color = colorWheel.getAverageColor(event.point) || new Color(1,1,1);
    $('.choose-color-sample').css('backgroundColor', color.toCSS());
    working.currentStyle.strokeColor = color;
  };

  shakeShowTools = new Shake({
    threshold: 15
  });
  shakeShowTools.start();
  window.addEventListener('devicemotion', function(event){
    event.preventDefault();
  });
  window.addEventListener('shake', shakeDetector);
  function shakeDetector(event){
    event.preventDefault();
    if(!$('.choose-color').hasClass('closed')){
      $('.color-picker-container').css('display', 'none');
      pencil.activate();
      $('.choose-color').toggleClass('closed');
      return true;
    }
    if($('.drawing-controls').hasClass('closed')){
      $('.drawing-controls').css('display', 'block');
      $('.exit-drawing').css('display', 'block');
    } else{
      $('.drawing-controls').css('display', 'none');
      $('.exit-drawing').css('display', 'none');
    };
    $('.drawing-controls').toggleClass('closed');
    $('.exit-drawing').toggleClass('closed');
  };
});

Template.drawingControls.onDestroyed(function(){
  shakeShowTools.stop();
});

Template.drawingControls.events({
  'click .undo': function(event){
    event.preventDefault();
    var lastPath = _.last(
      _.filter(
        _.sortBy(this.paths.fetch(), 'createdAt'), function(path){
          return path.userId === Meteor.userId();
        }
      )
    );
    Paths.remove({_id: lastPath._id});
  },
  'click .choose-color': function(event){
    event.preventDefault();
    if($(event.target).hasClass('closed')){
      $('.color-picker-container').css('display', 'block');
      colorPicker.activate();
    } else{
      $('.color-picker-container').css('display', 'none');
      pencil.activate();
    };
    $(event.target).toggleClass('closed');
  },
  'click .choose-stroke-width': function(event){
    event.preventDefault();
    if($(event.target).hasClass('closed')){
      $('.stroke-width-picker-container').css('display', 'block');
    } else{
      $('.stroke-width-picker-container').css('display', 'none');
    };
    $(event.target).toggleClass('closed');
  },
  'input .stroke-width': function(event){
    working.currentStyle.strokeWidth = $(event.target).val();
    $('.choose-stroke-width').text($(event.target).val());
  }
})