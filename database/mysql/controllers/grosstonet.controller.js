const grossToNetCalculate = require('../calculator/grosstonet.calculator');
const { Model} = require('objection');
const knex = require('../knex');

Model.knex(knex);

exports.grossToNet_home = function (req, res) {
    res.render("home", {gross:"" , socialInsurance:"", healthInsurance:"", unemploymentInsurance:"", tax:"", net:""});
};

exports.grossToNet_create = function (req, res) {

    let returnValue = grossToNetCalculate.GrossToNetCalculate(req.body.gross, req.body.area, req.body.dependents);

    knex('history').insert({
        gross: req.body.gross,
        dependent: req.body.dependents,
        area: req.body.area,
        net: returnValue.net
    }). then( function(result){
    })

    res.render("Home", {gross:req.body.gross , socialInsurance:-returnValue.socialInsurance, healthInsurance:-returnValue.healthInsurance, unemploymentInsurance:-returnValue.unemploymentInsurance, tax:-returnValue.tax, net:returnValue.net});
};