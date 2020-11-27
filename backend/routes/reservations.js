var express = require('express');
var router = express.Router();
const Reservation = require('../models/reservation_model');

// get all reservations
// GET http://localhost:3000/reservations/
router.get('/', function(req, res, next) {
  Reservation.query()
      .then(reservations => {
        res.json(reservations)
      })
});

// get reservation by id
// GET http://localhost:3000/reservations/1
router.get('/:id', (req, res) => {
    Reservation.query()
        .findById(req.params.id)
        .then(reservations => {
          res.json(reservations)
        })
  });

// get reservation by userId
// GET http://localhost:3000/reservations/userId/2
router.get('/userId/:userId', (req, res) => {
    Reservation.query()
        .where('userId', req.params.userId)
        .then(reservations => {
          res.json(reservations)
        })
  });

// get reservation by robotId
// GET http://localhost:3000/reservations/robotId/2
router.get('/robotId/:robotId', (req, res) => {
    Reservation.query()
        .where('robotId', req.params.robotId)
        .then(reservations => {
          res.json(reservations)
        })
  });

// create new reservation
// POST baseurl/reservations/add    # give reservation params as json, body->raw->json
/*
    POST http://localhost:3000/reservations/add/ HTTP/1.1
    Content-Type: application/json

    {
        "id": 4,
        "userId": 2,
        "robotId": 3,
        "startDate": "2020-12-09 10:00:00",
        "dueDate": "2020-12-09 11:00:00"
    }
*/
router.post('/add', async (req, res) => {
    const graph = req.body;
    let insertedGraph = await Reservation
        .query()
        .insertGraph((graph)
        );
        res.send(insertedGraph);
  });

module.exports = router;