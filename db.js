module.exports = {
  getUser: getUser,
  getUsers: getUsers,
  addUser: addUser
}

function getUsers (knex) {
  return knex('users').select()
}

function getUser (id, knex) {
  return knex('users').where('id', id)
}

function addUser (newUser, knex) {
  console.log('in insert: ' + newUser);
  return knex('users').insert(newUser)
}
