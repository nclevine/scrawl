Template.drawingControls.onRendered(function(){
  colors = new Project('color-picker');
  var colorWheel = new Raster('color-wheel');
  colorWheel.position = colors.view.center;
  colorWheel.scale(1, 0.5);
  colorPicker = new Tool()
  colorPicker.onMouseDown = pickColor;
  colorPicker.onMouseDrag = pickColor;
  function pickColor(event){
    var color = colorWheel.getPixel(event.point);
    $('.choose-color').css('backgroundColor', color.toCSS());
    working.currentStyle.strokeColor = color;
  };
})

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
  'blur #color-picker': function(event){
    $('.color-picker-container').css('display', 'none');
    pencil.activate();
    $('.choose-color').toggleClass('closed');
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