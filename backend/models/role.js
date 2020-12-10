'use strict';

const bookshelf = require('../config/bookshelf-instance');
const User = require('./user')

const Role = bookshelf.model('Role', {
    tableName: 'roles',
    users() {
        return this.belongsToMany(User, 'user_role');
    }
}); module.exports = Role;