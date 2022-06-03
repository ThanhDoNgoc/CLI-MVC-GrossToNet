const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let grossToNetSchema = new Schema({
    gross: {type: Number, required: true},
    dependents: {type: Number, required: true},
    area: {type: Number, required: true},
    net: {type: Number, required: true},
});

module.exports = mongoose.model('grossToNet', grossToNetSchema);