var express = require('express');
var router = express.Router();
var robots = require('../models/robot_model');

// get all robots
// GET http://localhost:3000/robots/
router.get('/', function(req, res, next) {
    robots.query()
        .then(robots => {
          res.json(robots)
        })
  });

// get robots by id
// GET http://localhost:3000/robots/1
router.get('/:id', (req, res) => {
    robots.query()
        .findById(req.params.id)
        .then(robots => {
          res.json(robots)
        })
  });

// get robots by name
// GET http://localhost:3000/robots/name/2
router.get('/:name', (req, res) => {
    robots.query()
        .findByName(req.params.name)
        .then(robots => {
          res.json(robots)
        })
  });

// delete robots by id
// GET http://localhost:3000/robots/1
router.get('/delete/:id', (req, res) => {
    robots.query()
        .deleteById(req.params.id)
        .then(robots => {
          res.json(robots)
        })
  });


// create new robot
// POST baseurl/robots/add    # give reservation params as json, body->raw->json
/*
    POST http://localhost:3000/robotss/add/ HTTP/1.1
    Content-Type: application/json

    {
        "name": "robot1",
        "type": "type1",
        "payload": 4
    }
*/
router.post('/add', async (req, res) => {
    const graph = req.body;
    let insertedGraph = await robots
        .query()
        .insertGraph((graph)
        );
        res.send(insertedGraph);
  });




module.exports = router;
