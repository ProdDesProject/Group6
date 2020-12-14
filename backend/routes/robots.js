var express = require('express');
var router = express.Router();
//var robots = require('../models/robot_model');
const Robot = require('../models/robot')
const jwtAuth = require('../middleware/jwt-authenticate');

// get robots reservations by id
router.get('/robotres/:id', (req, res) => {
    let id = parseInt(req.params.id)
    Robot.query()
        .where('id', id)
        .withGraphFetched('reserved')
        .then(robots => {
            res.status(200).json(robots)
        }).catch(err => res.sendStatus(400));
})

// get all robots
// GET http://localhost:3000/robots/
router.get('/', function(req, res, next) {
    robots.query()
        .then(robots => {
          res.status(200).json(robots)
        }).catch(err => res.sendStatus(400));
  });

// get robots by id
// GET http://localhost:3000/robots/{interger}
router.get('/:id', (req, res) => {
    robots.query()
        .findById(req.params.id)
        .then(robots => {
          res.status(200).json(robots)
        }).catch(err => res.sendStatus(400));
  });

// get robots by name
// GET http://localhost:3000/robots/name/{string(20)}
router.get('/name/:name', (req, res) => {
    robots.query()
        .where('name', 'like', req.params.name)
        .then(robots => {
          res.status(200).json(robots)
        }).catch(err => res.sendStatus(400));
  });

// get robots by type
// GET http://localhost:3000/robots/type/{string(5)}
router.get('/type/:type', (req, res) => {
  robots.query()
    .where('type', req.params.type)
    .then(robots => {
      res.status(200).json(robots)
    }).catch(err => res.sendStatus(400));
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
  var robot = await Robot.forge({
    name: req.body.name,
    type: req.body.type,
    url:  req.body.url,
    description: req.body.description
  }).save().catch(err => res.sendStatus(400));
  res.status(200).json(robot);
});

// update robots
// PUT http://localhost:3000/robots/update/{integer}
router.put('/update/:id', async (req, res) => {
  var robot = await Robot.where('id', req.params.id)
  .save({ ...req.body },
    { patch: true }
    ).catch(err => res.sendStatus(400));

  res.status(200).json(robot);
});


// delete robots by id
// GET http://localhost:3000/robots/{integer}
router.get('/delete/:id', (req, res) => {
  var robot = await Robot.where('id', req.params.id)
  .destroy().catch(err => res.sendStatus(400));
  res.status(200).json(robot);
});



module.exports = router;
