Scrawl by Noah Levine
A real-time collaborative drawing app that combines Meteor and Paper.js

---

##User Stories:
1. Users will be able to make and account and find their friends' accounts.
2. Users will be able to start a drawing board with a friend.
3. Users will be able to see what their friend is drawing in real time.
4. Users will be able to save the drawing in two ways:
  a) They can leave the drawing and return to it later.
  b) They can download the drawing as an image.
5. Users will be able to draw with more than one other friend.
6. Users will be able to choose from a variety of drawing tools.
7. Users will be able to include external images in their drawing.
8. Users will be able to use the app on their mobile device.

---

##ERD:

#Collections:

Users = {
  username: String,
  password: String,
  friends: [userIds]
}
(users will be made with Meteor's built-in account system, so it's not exactly a collection)
Drawings = {
  name: String,
  drawers: [userIds],
  createdAt: Date,
  updatedAt: Date
}