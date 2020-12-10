'use strict';

const bookshelf = require('../config/bookshelf-instance');
const Promise = require('bluebird');
const bcrypt = Promise.promisifyAll(require('bcryptjs'));
const Role = require('./role');
const Reservation = require('./reservation');
const securityConfig = require('../config/security-config');

const User = bookshelf.model('User', {
    tableName: 'users',
    roles() {
        return this.belongsToMany(Role, 'user_role');
    },
    reservations() {
        return this.hasMany(Reservation, 'userId', 'id');
    },
    validPassword(password) {
        return bcrypt.compareAsync(password, this.attributes.password);
    },
    initialize() {
        this.on('saving', model => {
            if (!model.hasChanged('password')) return;

            return Promise.coroutine(function* () {
                const salt = yield bcrypt.genSaltAsync(securityConfig.saltRounds);
                const hashedPassword = yield bcrypt.hashAsync(model.attributes.password, salt);
                model.set('password', hashedPassword);
            })();
        });
    }
}); module.exports = User;