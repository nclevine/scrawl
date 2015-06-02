Template.accountLogin.helpers({
  title: function(){
    if(Meteor.user()){
      return Meteor.user().username;
    } else{
      return 'Sign in';
    };
  }
})

Template.accountLogin.events({
  'click .login-header': function(event){
    event.preventDefault();
    $('.login-form').css('display', 'block');
  },
  'click .close-login': function(event){
    event.preventDefault();
    $('.login-form').css('display', 'none');
  },
  'click .signin-signup': function(){
    event.preventDefault();
    if($(event.target).hasClass('ss-signup')){
      $('.signup').css('display', 'block');
      $('.login-submit').val('Sign up');
      $('.login-form form').toggleClass('signing-in signing-up');
      $(event.target).text('Sign in');
    } else{
      $('.signup').css('display', 'none');
      $('.login-submit').val('Sign in');
      $('.login-form form').toggleClass('signing-in signing-up');
      $(event.target).text('Sign up');
    };
    $(event.target).toggleClass('ss-signup ss-signin')
  },
  'submit form': function(event){
    event.preventDefault();
    var username = $(event.target).find('[name=username]').val();
    var password = $(event.target).find('[name=password]').val();
    if($(event.target).hasClass('signing-in')){
      Meteor.loginWithPassword(username, password);
    } else{
      var passwordConfirm = $(event.target).find('[name=confirm-password]').val();
      var firstName = $(event.target).find('[name=first-name]').val();
      var lastName = $(event.target).find('[name=last-name]').val();
      var newUser = {
        username: username,
        password: password,
        profile: {
          firstName: firstName,
          lastName: lastName,
          private: false
        }
      };
      if(!newUser.username || newUser.username.length < 4){
        $('.failure').text('Username must be 4 letters or more');
        $('.failure').css('display', 'block');
        return false;
      } else if(!newUser.password || newUser.password.length < 6){
        $('.failure').text('Password must be 6 letters or more');
        $('.failure').css('display', 'block');
        return false;
      } else if(!passwordConfirm || passwordConfirm !== newUser.password){
        $('.failure').text("Passwords don't match");
        $('.failure').css('display', 'block');
        return false;
      } else{
        Accounts.createUser(newUser);
        $('.failure').css('display', 'none');
      }
    };
    $('.login-form').css('display', 'none');
  },
  'click .logout': function(event){
    event.preventDefault();
    Meteor.logout();
    $('.login-form').css('display', 'none');
    Router.go('drawingsList');
  }
})