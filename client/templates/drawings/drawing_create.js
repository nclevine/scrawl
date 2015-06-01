Template.drawingCreate.helpers({
  users: function(){
    return Meteor.users.find({_id: {$ne: Meteor.userId()}});
  }
});

Template.drawingCreate.events({
  'submit form': function(event){
    event.preventDefault();

    var drawing = {
      title: $(event.target).find('[name=title]').val(),
      drawers: [
        Meteor.userId(),
        $(event.target).find('[name=other-user]').val()
      ]
    };

    Meteor.call('drawingInsert', drawing, function(error, result){
      Router.go('drawingPage', {_id: result._id});
    });
  }
})