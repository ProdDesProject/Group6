var express = require('express');
var router = express.Router();
const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig);
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

// get all reservations with user name, user email and robot name, robot type
// GET baseurl/reservations/management
router.get('/management', async (req, res) => {
    try {
        let reservations = await knex.select('*').from('reservations')
        let users = await knex.select('id',"name","email").from('users')
        let robots = await knex.select('id',"name","type").from('robots')
        reservations.forEach(r => {
            users.forEach(u=>{
                if (r.userId==u.id) {
                    r.username=u.name;
                    r.email=u.email;
                }
            })
        });
        reservations.forEach(r=>{
            robots.forEach(o=>{
                if(r.robotId==o.id) {
                    r.robotname=o.name;
                    r.robotType=o.type
                }
            })
        })
        res.status(200).json(reservations);
    }
    catch(err) {
        console.log(err)
    }
    
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
    try {
        let robots = await Robot.query().then().catch(err => res.sendStatus(400));
        let reservations = await knex.select("*").from("reservations").where("userId", req.params.userId)
        reservations.forEach(x => {
            robots.forEach(y => {
                if (x.robotId == y.id) {
                    x.robotname = y.name
                }
            })
        });
        res.status(200).json(reservations);
    }
    catch {
        res.sendStatus(400)
    }
    
    
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
// POST http://localhost:3000/reservations/robot-schedule
router.post('/robot-schedule', jwtAuth, async(req,res) => {
    try {
        let myReservation = await knex.select("*").from("reservations").where("date",req.body.date).where("robotId",req.body.robotId).where("userId",req.user.id)
        let othersReservation = await knex.select("*").from("reservations").where("date",req.body.date).where("robotId",req.body.robotId).whereNot("userId",req.user.id)
        let myTime = []
        let othersTime = []
        myReservation.forEach(x=>{
            myTime = [...myTime, ...JSON.parse(x.time)]
        })
        othersReservation.forEach(x=>{
            othersTime = [...othersTime, ...JSON.parse(x.time)]
        })
        res.status(200).json({userId: req.user.id, robotId: req.body.robotId, date: req.body.date, myTime, othersTime})
    }
    catch(err) {
        console.log(err)
        res.status(400).json({err: String(err)})
    }
});

//user time booking API
//localhost:3000/reservations/booking

router.post('/booking', jwtAuth, async (req,res) => {
    var reservation = await Reservation.forge({
            userId: req.user.id,
            robotId: req.body.robotId,
            date: req.body.date,
            time: req.body.time
    }).save().catch(err => res.sendStatus(400));
    res.status(200).json(reservation);
  }) 
  

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