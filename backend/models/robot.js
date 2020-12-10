'use strict';

const bookshelf = require('../config/bookshelf-instance');
const Reservation = require('./reservation');

const Robot = bookshelf.model('Robot', {
    tableName: 'robots',
    robres() {
        return this.hasMany('Reservation', 'robotId', 'id');
        }
}); module.exports = Robot;