var express = require('express');
var router = express.Router();
const knex = require('knex')('../knexfile');
const Reservation = require('../models/reservation');
const User = require('../models/user')
const Robot = require('../models/robot')

// get all reservations
// GET baseurl/reservations
router.get('/', function(req, res, next) {
  Reservation.query()
      .then(reservations => {
        res.json(reservations)
      })
});

// get reservation by id
// GET baseurl/reservations
router.get('/:id', (req, res) => {
    Reservation.query()
        .findById(req.params.id)
        .then(reservations => {
          res.json(reservations)
        })
    console.log(req.params.id);
  });

// get reservation by userId
// GET baseurl/reservations/id/{userId} 
router.get('/userId/:userId', async (req, res) => {
    var user = await User.where('id', req.params.userId).fetch({
        withRelated: ["reservations"]
      });
      res.json(user.related("reservations"));    
  });

// get reservation by robotId
// GET baseurl/reservations/id/{userId} 
router.get('/robotId/:robotId', async (req, res) => {
    var robot = await Robot.where('id', req.params.robotId).fetch({
        withRelated: ["robres"]
      });
      res.json(robot.related("robres"));    
  });
  

// create new reservation
// POST baseurl/reservations/add    # give reservation params as json, body->raw->json
router.post('/add', async (req, res) => {
    var reservation = await Reservation.forge({
        userId: req.body.userId,
        robotId: req.body.robotId,
        startDate: req.body.startDate,
        dueDate: req.body.dueDate
    }).save();
        res.json(reservation);
  });

// update reservation 
// PUT baseurl/reservation/update
router.put('/update/:id', async (req, res) => {
    var reservation = await Reservation.where('id', req.params.id)
    .save({ ...req.body },
        { patch: true }
        );
        res.json(reservation);
});

// delete reservation by user_id
// DELETE baseurl/reservations/delete/{user_id}
router.delete('/delete/:id', async (req,res) => {
    var reservation = await Reservation.where('id', req.params.id)
        .destroy();
        res.json(reservation);
});

module.exports = router;