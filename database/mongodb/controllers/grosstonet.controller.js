const grossToNet = require('../models/grosstonet.model');
const grossToNetCalculate = require('../calculator/grosstonet.calculator');

exports.grossToNet_home = function (req, res) {
    res.render("home", {gross:"" , socialInsurance:"", healthInsurance:"", unemploymentInsurance:"", tax:"", net:""});
};


exports.grossToNet_create = function (req, res) {

    let returnValue = grossToNetCalculate.GrossToNetCalculate(req.body.gross, req.body.area, req.body.dependents);

    let salary = new grossToNet(
        {
            gross: req.body.gross,
            dependents: req.body.dependents,
            area: req.body.area,
            net: returnValue.net
        }
    );

    salary.save(function (err) {
        if (err) {
            console.log(err);
        }
    })

    res.render("Home", {gross:req.body.gross , socialInsurance:-returnValue.socialInsurance, healthInsurance:-returnValue.healthInsurance, unemploymentInsurance:-returnValue.unemploymentInsurance, tax:-returnValue.tax, net:returnValue.net});
};