var express = require('express');
var router = express.Router();
const knex = require('knex')('../knexfile');
const Reservation = require('../models/reservation');
const User = require('../models/user')
const Robot = require('../models/robot')
const jwtAuth = require('../middleware/jwt-authenticate');

// get all reservations
// GET baseurl/reservations
router.get('/', function(req, res) {
    Reservation.query()
    .then(reservations => {
    res.status(200).json(reservations)
    }).catch(err => res.sendStatus(400));
});

// get reservation by id
// GET baseurl/reservations/{id}
router.get('/:id', (req, res) => {
    Reservation.where('id', req.params.id).fetch().then(reservations => {
        res.status(200).json(reservations);
    }).catch(err => res.sendStatus(400));
  });

// get reservation by userId
// GET baseurl/reservations/userId/{id} 
router.get('/userId/:userId', async (req, res) => {
    var user = await User.where('id', req.params.userId).fetch({
    withRelated: ["reservations"]}).catch(err => res.sendStatus(400));
    res.status(200).json(user.related("reservations"));
  });

// get reservation by robotId
// GET baseurl/reservations/robotId/{id} 
router.get('/robotId/:robotId', async (req, res) => {
    var robot = await Robot.where('id', req.params.robotId).fetch({
        withRelated: ["robres"]
      }).catch(err => res.sendStatus(400));
      res.status(200).json(robot.related("robres"));
  });

// update reservation 
// PUT baseurl/reservation/update/{id}
router.put('/update/:id', async (req, res) => {
    var reservation = await Reservation.where('id', req.params.id)
    .save({ ...req.body },
        { patch: true }
        ).catch(err => res.sendStatus(400));
        res.status(200).json(reservation);
});

// DELETE reservation with id api
// DELETE http://localhost:3000/reservations/delete/{id}
router.delete('/delete/:id', jwtAuth, async (req,res) => {
    var reservation = await Reservation.where('id', req.params.id)
        .destroy().catch(err => res.sendStatus(400));
        res.status(200).json(reservation);
});

// reserve time api
// POST http://localhost:3000/reservations/add_new
router.post('/add_new', jwtAuth, async (req,res) => {
    var reservation = await Reservation.forge({
            userId: req.user.id,
            robotId: req.body.robotId,
            date: req.body.date,
            time: req.body.time
        }).save().catch(err => res.sendStatus(400));
        res.status(200).json(reservation);

})

// get robot schedule api
// GET http://localhost:3000/reservations/robots/{id}&{date}
router.get('/robots/:robotId&:date', jwtAuth, async(req,res) => {
    Reservation.query({where: {robotId: req.params.robotId, date: req.params.date
    //,userId: req.user.id
    }}).fetchAll({columns: ['time', 'userId']}).then(own=>
        {
            res.status(200).send("current user id: " + req.user.id + ", all reservations: " + JSON.stringify(own));
        }).catch(err => res.sendStatus(400));   
    /*Reservation.query({where: {robotId: req.params.robotId, date: req.params.date}}).fetchAll({columns: ['time', 'userId']}).then(reservations => {
        res.json(reservations)
        })*/
});


/*
// delete reservation by user_id
// DELETE baseurl/reservations/delete/{id}
router.delete('/delete/:id', async (req,res) => {
    var reservation = await Reservation.where('id', req.params.id)
        .destroy();
        res.json(reservation);
});


// create new reservation
// POST baseurl/reservations/add    # give reservation params as json, body->raw->json
router.post('/add', async (req, res) => {
    var reservation = await Reservation.forge({
        userId: req.body.userId,
        robotId: req.body.robotId,
        date: req.body.date,
        time: req.body.time
    }).save();
        res.json(reservation);
  });
  */

module.exports = router;