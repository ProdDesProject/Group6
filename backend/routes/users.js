var express = require('express');
const { post } = require('../app');
var router = express.Router();
const jwtAuth = require('../middleware/jwt-authenticate');

//const User = require('../models/user_model')
const User = require('../models/user');



//get localhost:3000/users
router.get('/', async(req,res) => {
  var user = await new User().fetchAll()
  .catch(err => res.sendStatus(400));
  res.status(200).json(user);
  
});




router.get('/userId/:userId', async (req, res) => {
  var user = await User.where('id', req.params.userId).fetch({
  }).catch(err => res.sendStatus(400));
  res.status(200).json(user);
});



router.post("/add", async (req,res) => {
  var user = await User.forge({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    classname: req.body.classname
  }).save().catch(err => res.sendStatus(400));
  res.status(200).json(user);
});

//update
router.put('/update/:id', async (req, res) => {
  var user = await User.where('id', req.params.id)
  .save({ ...req.body },
      { patch: true }
      ).catch(err => res.sendStatus(400));
      res.status(200).json(user);
});



/* router.delete('/delete/:userId', async (res,req) => {
  const userId = Number(req.params.userId);
  var user = await User.where('id', userId).destroy();
  res.json(user);
}); */

router.delete('/delete/:id', async (req,res) => {
  var user = await User.where('id', req.params.id)
      .destroy().catch(err => res.status(400).json({err: String( err)}));
      res.status(200).json(user);
});


// get user's reservations by id
// GET http://localhost:3000/users/userres/1
/* router.get('/user_reservation/:id', (req, res) => {
    let id = parseInt(req.params.id)
    User.query()
        .where('id', id)
        .withGraphFetched('reservations')
        .then(users => {
            res.json(users)
        })
}) */

router.get('/user_reservation/:id', async (req,res) => {
  var user = await User.where('id', req.params.id).fetch({
    withRelated: ["reservations"]}).catch(err => res.sendStatus(400));
    res.status(200).json(user.related("reservations"));
});

//User time booking API
// 

 router.post('/booking', jwtAuth, async (req,res) => {
  var reservation = await Reservation.forge({
      userId: req.user.id,
      robotId: req.user.robotId,
      date: req.user.date,
      time: req.user.time
  }).save().catch(err => res.sendStatus(400));
  res.status(200).json(reservation);
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

router.post('/add_reservation/', async (req, res) => {
    const graph = req.body;
    const insertedRes = await User.query()
        .allowGraph('reservations')
        .insertGraph((graph)
        );
        res.send(insertedRes);
})*/


module.exports = router;
