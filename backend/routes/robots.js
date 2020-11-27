var express = require('express');
var router = express.Router();
var robots = require('../models/robot_model');

router.get('/:id?', function(req, res, next) {
    if (req.params.id) {
      book.getById(req.params.id, function(err, rows) {
        if (err) {
          res.json(err);
        } else {
          res.json(rows.rows);
        }
      });
    } else {
      book.get(function(err, rows) {
        if (err) {
          res.json(err);
        } else {
          res.json(rows.rows);
        }
      });
    }
  });

router.post('/', function(req, res, next) {
    robots.add(req.body, function(err, count) {
        if(err) {
            res.json(err);
        } else {
            res.json(req.body);
        }
    });
});

router.delete('/:id', function(req, res, next) {
    robots.delete(req.body, function(err, count) {
        if(err) {
            res.json(err);
        } else {
            res.json(req.body);
        }
    });
});

router.put('/:id', function(req, res, next) {
    robots.update(req.body, function(err, count) {
        if(err) {
            res.json(err);
        } else {
            res.json(req.body);
        }
    });
});

router.get('/name/:value?', function(req, res, next) {
    robots.searchByName(req.body, function(err, count) {
        if(err) {
            res.json(err);
        } else {
            res.json(req.body);
        }
    });
});

router.get('/type/:value?', function(req, res, next) {
    robots.searchByType(req.body, function(err, count) {
        if(err) {
            res.json(err);
        } else {
            res.json(req.body);
        }
    });
});

router.get('/payload/:value?', function(req, res, next) {
    robots.searchByPayload(req.body, function(err, cout) {
        if(err) {
            res.json(err);
        } else {
            res.json(req.body);
        }
    });
});

module.exports = router;
