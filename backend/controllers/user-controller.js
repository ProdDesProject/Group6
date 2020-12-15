'use strict';

const express = require('express');
const User = require('../models/user');
const jwtAuth = require('../middleware/jwt-authenticate');

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

module.exports = router;