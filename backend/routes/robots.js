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
router.get('/name/:name', (req, res) => {
    robots.query()
        .where('name', req.params.name)
        .then(robots => {
          res.json(robots)
        })
  });

// get robots by type
// GET http://localhost:3000/robots/type/2
router.get('/type/:type', (req, res) => {
  robots.query()
    .where('type', req.params.type)
    .then(robots => {
      res.json(robots)
    })
});

// get robots by payload
// GET http://localhost:3000/robots/payload/2
router.get('/payload/:payload', (req, res) => {
  robots.query()
    .where('payload', req.params.payload)
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

// update robots
// PUT http://localhost:3000/robots/update/3
router.put('/update/:id', (req, res) => {
  const upd = req.body;
  robots.query()
    .patch(upd)
    .where('id', req.params.id)
    .then(robots => {
      res.json(robots)
    })
});


// delete robots by id
// GET http://localhost:3000/robots/3
router.get('/delete/:id', (req, res) => {
    robots.query()
        .delete()
        .where('id', req.params.id)
        .then(robots => {
          res.json(robots)
        })
  });



module.exports = router;
