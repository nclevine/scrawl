Accounts.onCreateUser(function(options, user){
  Friends.insert({
    userId: user._id,
    friends: [],
    receivedRequestFrom: [],
    sentRequestTo: []
  });
  if(options.profile){
    user.profile = options.profile;
  }
  return user;
});