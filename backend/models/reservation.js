'use strict';

const bookshelf = require('../config/bookshelf-instance');
const User = require('./user');
const Robot = require('./robot');

var Reservation = bookshelf.Model.extend({
    tableName: 'reservations',
    users() {
        return this.belongsToMany(User)
    },
    robots() {
        return this.belongsToMany(Robot)
    }
}); module.exports = bookshelf.model('Reservation', Reservation);
