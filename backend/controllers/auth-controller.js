'use strict';

const express = require('express');
const jwt = require('jwt-simple');
const Promise = require('bluebird');
const User = require('../models/user');
const securityConfig = require('../config/security-config');

const router = express.Router();

function status (name){
    if (name === 'admin') {
        return true;
    }
    else {
        return false;
    }
}

router.post('/login', function(req, res) {
    const {email, password} = req.body;
    Promise.coroutine(function* () {
        const user = yield User.where('email', email).fetch();
        let user2 = user;
        let stringUser = JSON.stringify(user2);
        let parseUser = JSON.parse(stringUser);
        const isValidPassword = yield user.validPassword(password);
        if (isValidPassword) {
            const token = jwt.encode(user.omit('password'), securityConfig.jwtSecret);
            res.json({success: true, token: `JWT ${token}`, adminStatus: status(parseUser.name), id: user.id});
        } else {
            res.json({success: false, msg: 'Authentication failed'});
        }
    })().catch(err => console.log(err));
});

router.post('/register', function(req, res) {
    const {name,email,password,classname} = req.body;
    User.forge({name,email,password,classname}).save()
        .then(user => res.json(user.omit('password')));
});

router.post('/add'), (req, res) => {
    const {email,password} = req.body;
    User.forge({email, password}).save()
        .then(user => res.json(user.omit('password')));
};

module.exports = router;