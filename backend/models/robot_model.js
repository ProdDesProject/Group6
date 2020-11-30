const { Model } = require('objection');
const knex = require('../knexfile')

Model.knex(knex)

class Robot extends Model {
    static get tableName() {
        return 'robots'
    }
    static get relationMappings() {
        const Reservation = require('./reservation_model')
        return {
            reserved: {
                relation: Model.HasManyRelation,
                modelClass: Reservation,
                join: {
                    from: 'robots.id',
                    to: 'reservations.robotId'
                }
            }
        }
    }
}

module.exports = Robot;