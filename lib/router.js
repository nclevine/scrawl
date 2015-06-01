Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function(){
    return [Meteor.subscribe('drawings'), Meteor.subscribe('paths')];
  }
});

Router.route('/', {
  name: 'drawingsList',
  waitOn: function(){
    return Meteor.subscribe('users');
  }
});

Router.route('/drawings/:_id', {
  name: 'drawingPage',
  data: function(){
    return {
      drawing: Drawings.findOne(this.params._id),
      paths: Paths.find({drawingId: this.params._id})
    }
  }
});

Router.route('/create', {
  name: 'drawingCreate',
  waitOn: function(){
    return Meteor.subscribe('users');
  }
});