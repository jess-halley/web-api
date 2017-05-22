var express = require('express')
var router = express.Router()

var db = require('../db')

router.get ('/', function (req, res) {
  db.getUsers(req.app.get('knex'))
    .then(function (users) {
      res.send({ users: users })
    })
    .catch(function (err) {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
})

router.post('/', function (req, res) {
  var {name, email} = req.body
  db.addUser(name, email, req.app.get('knex'))
  .then(function (id){
    res.status(201).send({id: id[0]})
  })
  .catch(function (err) {
    res.status(500).send('DATABASE ERROR: ' + err.message)
  })
})

router.get('/:id', function (req, res) {
  db.getUser(req.params.id, req.app.get('knex'))
    .then(function (user) {
      res.status(200).send({user: user[0]})
    })
    .catch(function (err) {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
})

router.put('/:id', function (req, res) {
  db.updateUser(req.params.id, req.body, req.app.get('knex'))
    .then(function (numOfUpdates) {
      console.log(numOfUpdates);
      res.status(200).send({updates: numOfUpdates})
    })
    .catch(function (err) {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
})




module.exports = router
