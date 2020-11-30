const { Model } = require('objection');
const knex = require('../knexfile')

Model.knex(knex)

class User extends Model {
    static get tableName() {
        return 'users'
    }

    static get relationMappings() {
        const Reservation = require('./reservation_model')
        return {
            reservations: {
                relation: Model.HasManyRelation,
                modelClass: Reservation,
                join: {
                    from: 'users.id',
                    to: 'reservations.userId'
                }
            }
        }
    }
}

module.exports = User;