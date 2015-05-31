Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function(){
    return [Meteor.subscribe('drawings')];
  }
});

Router.route('/', {
  name: 'drawingsList',
  waitOn: function(){
    return Meteor.subscribe('users');
  }
});

Router.route('/drawings/:_id', {
  name: 'drawingBoard',
  data: function(){
    return Drawings.findOne(this.params._id);
  }
});

Router.route('/create', {
  name: 'drawingCreate',
  waitOn: function(){
    return Meteor.subscribe('users');
  }
});