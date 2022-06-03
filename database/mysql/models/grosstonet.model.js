const { Model} = require('objection');

class Customer extends Model {
    static get tableName(){
        return 'history';
    }
}

module.exports = Customer
