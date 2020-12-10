var express = require('express');
var router = express.Router();
//var robots = require('../models/robot_model');
const Robot = require('../models/robot')

// GET baseurl/users
router.get('/', function(req, res, next) {
    Robot.query()
        .then(robots => {
          res.json(robots)
        })
  });

// get robots reservations by id
router.get('/robotres/:id', (req, res) => {
    let id = parseInt(req.params.id)
    Robot.query()
        .where('id', id)
        .withGraphFetched('reserved')
        .then(robots => {
            res.json(robots)
        })
})

// get all robots
// GET http://localhost:3000/robots/
router.get('/', function(req, res, next) {
    robots.query()
        .then(robots => {
          res.json(robots)
        })
  });

// get robots by id
// GET http://localhost:3000/robots/{interger}
router.get('/:id', (req, res) => {
    robots.query()
        .findById(req.params.id)
        .then(robots => {
          res.json(robots)
        })
  });

// get robots by name
// GET http://localhost:3000/robots/name/{string(20)}
router.get('/name/:name', (req, res) => {
    robots.query()
        .where('name', req.params.name)
        .then(robots => {
          res.json(robots)
        })
  });

// get robots by type
// GET http://localhost:3000/robots/type/{string(5)}
router.get('/type/:type', (req, res) => {
  robots.query()
    .where('type', req.params.type)
    .then(robots => {
      res.json(robots)
    })
});

// create new robot
// POST baseurl/robots/add    # give reservation params as json, body->raw->json
/*
    POST http://localhost:3000/robots/add/ HTTP/1.1
    Content-Type: application/json

    {
        "name": "robot1",
        "type": "type1",
        "url": "image_url",
        "description": "desciption1"
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
// PUT http://localhost:3000/robots/update/{integer}
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
// GET http://localhost:3000/robots/{integer}
router.get('/delete/:id', (req, res) => {
    robots.query()
        .delete()
        .where('id', req.params.id)
        .then(robots => {
          res.json(robots)
        })
  });



module.exports = router;
