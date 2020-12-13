'use strict';

const express = require('express');
const User = require('../models/user');
const jwtAuth = require('../middleware/jwt-authenticate');
const authorizedRoles = require('../middleware/roles-authorize');

const router = express.Router();

router.get('/', function(req, res) {
    User.fetchAll().then(function(users) {
        res.json(users);
    });
});

router.post('/add'), (req, res) => {
    const {email,password} = req.body;
    User.forge({email, password}).save()
        .then(user => res.json(user.omit('password')));
};

/*router.get('/securedArea', jwtAuth, authorizedRoles('ROLE_ADMIN'), function(req, res) {
    res.json({msg: "You made it to the secure area"});
});

router.get('/user', jwtAuth, function(req, res) {
    res.json(req.user);
});*/

module.exports = router;