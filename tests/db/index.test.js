// Note: we use AVA here because it makes setting up the
// conditions for each test relatively simple. The same
// can be done with Tape using a bit more code.

var test = require('ava')

var db = require('../../db')
var setupDb = require('../setup-db.js')

setupDb(test)

test('getUsers gets all users', function (t) {
  // One for each letter of the alphabet!
  var expected = 26
  return db.getUsers(t.context.db)
    .then(function (result) {
      var actual = result.length
      t.is(actual, expected)
    })
})

test('getUsers gets a single user', function (t) {
  var expected = 'Ambitious Aardvark'
  return db.getUser(99901, t.context.db)
    .then(function (result) {
      var actual = result[0].name
      t.is(actual, expected)
    })
})


test('create a new user', function (t){
  var expected = 99927
  return db.addUser({name:'Jess', email:'gsfjd'}, t.context.db)
  .then(function (result){
    var actual = result[0]
    t.is(actual, expected)
    return(result[0])
  })
  .then(function (id) {
    console.log('Id: ' + id);
    return id
  })
  .then(function (id){
    return db.getUser(id, t.context.db)
  })
  .then(function (user) {
    console.log('Added user: ' + user[0]);
    return user
  })
  .then(function (addedUser){
    var actual = result[0].name
    t.is(actual, 'Jess')
  })
})
