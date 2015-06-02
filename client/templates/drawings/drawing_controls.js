Template.drawingControls.events({
  'click .make-green': function(event){
    event.preventDefault();
    working.currentStyle = {
      strokeColor: 'green'
    };
  },
  'click .thicker': function(event){
    event.preventDefault();
    working.currentStyle.strokeWidth = 3;
  }
})