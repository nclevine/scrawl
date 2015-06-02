Template.drawingPage.helpers({
  canSee: function(){
    if(this.drawing.private === false || _.contains(this.drawing.drawers, Meteor.userId())){
      return true;
    } else{
      return false;
    }
  }
})