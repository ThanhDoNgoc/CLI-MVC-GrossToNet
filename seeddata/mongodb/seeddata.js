const dbConfig = "mongodb://localhost:27017/mydb"; //MongoDBConnect
const mongoose = require('mongoose');
const grossToNet = require('./models/grosstonet.model');
const grossToNetCalculate = require('./calculator/grosstonet.calculator');

mongoose.set('useCreateIndex', true);
mongoose.connect(dbConfig, {
    useNewUrlParser: true,
    useUnifiedTopology: true 
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

grossToNet.remove({}, function(){
    console.log('Database Cleard');
})

var count = 0;
var num_records = 10;

for (var i=0; i< num_records; i++) {

    const gross=  Math.floor(Math.random() * 100000000)+10000000;
    const dependents= Math.floor(Math.random() * 3);
    const area= Math.floor(Math.random() * 3)+1;
    let returnValue = grossToNetCalculate.GrossToNetCalculate(gross, area, dependents);
    const net = returnValue.net;

    grossToNet.create({
        gross: gross,
        dependents: dependents,
        area: area,
        net: net,
    }, function(){
        count++;
        if(count >= num_records) {
            mongoose.connection.close();
            console.log("Database Seeded");
        }
    });
}
