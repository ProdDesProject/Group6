const { Model } = require('objection');
const knex = require('../knexfile')

Model.knex(knex)

class Reservation extends Model {
    static get tableName() {
        return 'reservations'
    }
    static get relationMappings() {
        const User = require('./user_model')
        return {
            reserver: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: 'reservations.userId',
                    to: 'users.id'
                }
            }
        }
    }

    static get relationMappings() {
        const Robot = require('./robot_model')
        return {
            reserved_robot: {
                relation: Model.BelongsToOneRelation,
                modelClass: Robot,
                join: {
                    from: 'reservations.robotId',
                    to: 'robots.id'
                }
            }
        }
    }
}

module.exports = Reservation;