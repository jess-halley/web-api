module.exports = {
  getUser: getUser,
  getUsers: getUsers,
  addUser: addUser,
  updateUser
}

function getUsers (knex) {
  return knex('users').select()
}

function getUser (id, knex) {
  return knex('users').where('id', id)
}

function addUser (name, email, knex) {
  return knex('users')
    .insert({
      name: name,
      email: email
    })
}

function updateUser (id, data, knex) {
  return knex('users')
    .where('id', id)
    .update(data)
}
