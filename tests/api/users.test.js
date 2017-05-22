// Note: we use AVA here because it makes setting up the
// conditions for each test relatively simple. The same
// can be done with Tape using a bit more code.

var test = require('ava')
var request = require('supertest')

var app = require('../../server')
var setupDb = require('../setup-db')

setupDb(test, function (db) {
  app.set('knex', db)
})

test.cb('getUsers gets all users', function (t) {
  var expected = 26
  request(app)
    .get('/users')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function (err, res) {
      if (err) throw err
      t.is(res.body.users.length, expected)
      t.end()
    })
})

test.cb('get the details of one user', function (t) {
  var expected = 'Ambitious Aardvark'
  request(app)
    .get('/users/99901')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function (err, res) {
      if (err) throw err
      t.is(res.body.user.name, expected)
      t.end()
    })
})


test.cb('add a user', function (t) {
  var expected = 99927
  request(app)
    .post('/users')
    .expect('Content-Type', /json/)
    .end(function(err, res) {
      if (err) throw err
      t.is(res.body.id, expected)
      t.end()
    })
})

test.cb('update a user from id', function (t) {
  var expected = "Joshua"
  request(app)
    .post('/users/99910')
    .end(function(err, res) {
      if (err) throw err
      console.log(res.body);
      t.is(res.body, 1)
      t.end()
    })
})
