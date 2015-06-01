Accounts.onCreateUser(function(options, user){
  Friends.insert({
    userId: user._id,
    friends: [],
    receivedRequestFrom: [],
    sentRequestTo: []
  });
  return user;
})