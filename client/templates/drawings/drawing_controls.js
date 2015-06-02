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