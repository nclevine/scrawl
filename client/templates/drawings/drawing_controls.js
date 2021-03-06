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
    if(color.gray > 0.6){
      $('.choose-color-sample').css('color', 'black');
    } else{
      $('.choose-color-sample').css('color', 'white');
    }
  };

  shake.startWatch(shakeDetector, 15);
  
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
  shake.stopWatch();
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
      $('.stroke-width-picker-container').css('display', 'block');
      $('.other-tools').css('display', 'block');
      colorPicker.activate();
    } else{
      $('.color-picker-container').css('display', 'none');
      $('.stroke-width-picker-container').css('display', 'none');
      $('.other-tools').css('display', 'none');
      pencil.activate();
    };
    $(event.target).toggleClass('closed');
  },
  'click .hatch-select': function(event){
    $('.color-picker-container').css('display', 'none');
    $('.stroke-width-picker-container').css('display', 'none');
    $('.other-tools').css('display', 'none');
    $('.choose-color-sample').toggleClass('closed');
    hatch.activate();
  },
  'click .dots-select': function(event){
    $('.color-picker-container').css('display', 'none');
    $('.stroke-width-picker-container').css('display', 'none');
    $('.other-tools').css('display', 'none');
    $('.choose-color-sample').toggleClass('closed');
    dots.activate();
  },
  'input .stroke-width': function(event){
    working.currentStyle.strokeWidth = $(event.target).val();
    $('.choose-color-sample').text($(event.target).val());
  }
})