var express = require('express');
const { post } = require('../app');
var router = express.Router();

//const User = require('../models/user_model')
const User = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.query()
      .then(users => {
        res.json(users)
      })
});

router.get('/:id', (req, res) => {
  User.query()
      .findById(req.params.id)
      .then(users => {
        res.json(users)
      })
  console.log(req.params.id);

});

router.post('/add', async (req, res) => {
  const graph = req.body;
  let insertedGraph = await User
      .query()
      .insertGraph((graph)
      );
      res.send(insertedGraph);
});

// does this work?
router.get('/delete/:id', async function (req,res){
    const numDeleted = await User.query()
        .deleteById(req.params.id);
        res.redirect('/users/')
  });

// get user's reservations by id
// GET http://localhost:3000/users/userres/1
router.get('/user_reservation/:id', (req, res) => {
    let id = parseInt(req.params.id)
    User.query()
        .where('id', id)
        .withGraphFetched('reservations')
        .then(users => {
            res.json(users)
        })
})

// add new user & reservation
/*
POST http://localhost:3000/users/addres HTTP/1.1
content-type: application/json

{
    "name": "malli",
    "email": "email",
    "password": "pass",
    "class": "class",
    "role": "user",
    "reservations": [
      {
        "robotId": 2,
        "startDate": "2020-12-09 10:00:00",
        "dueDate": "2020-12-09 11:00:00"
      }
    ]
  }
*/
router.post('/add_reservation/', async (req, res) => {
    const graph = req.body;
    const insertedRes = await User.query()
        .allowGraph('reservations')
        .insertGraph((graph)
        );
        res.send(insertedRes);
})


module.exports = router;
