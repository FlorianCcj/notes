const users = [];

function userJoin(id, pseudo, room) {
  const user = { id, pseudo, room };

  users.push(user);

  return user;
}

function getCurrentUser(id) {
  console.log('Users - getCurrentUser');
  console.log(users);
  return users.find(user => user.id === id);
}

function userLeave(id) {
  const index = users.findIndex(user => user.id === id);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

function getRoomUsers(room) {
  return users.filter(user => user.room === room);
}

module.exports = {
  getCurrentUser,
  getRoomUsers,
  userJoin,
  userLeave
};
