const express = require ("express");
const app = express();
const logger = require ("morgan");
const mongoose = require ("mongoose");
const compression = require ("compression");
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

const PORT = 3000;


//app.use(logger("dev"));

//app.use(compression());
//app.use(express.urlencoded({extended: true}));
//app.use(express.json());

app.use(express.static("public"));



// make a connection
mongoose.connect('mongodb://localhost/budget');

// get reference to database
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));


// define Schema
var transactionSchema = mongoose.Schema({
    name: String,
    value: Number
});

// compile schema to model
var Transaction = mongoose.model('Transaction', transactionSchema, 'budget');


// Post to collection
app.post('/api/transaction', function (req, res) {
    console.log('received post');

    // a document instance
    var newTransaction = new Transaction({
        name: req.body.name,
        value: req.body.value
    });
   
    // save model to database
    newTransaction.save(function (err, book) {
        if (err) return console.error(err);
        console.log(newTransaction.name + " saved to collection.");
    });

});

// Get from colletion
app.get('/api/transaction', function (req, res) {
    console.log('fetching posts');

    Transaction
        .find({})
        .sort({ date: -1 })
        .then((dbTransaction) => {
            res.json(dbTransaction);
        })
        .catch((err) => {
            res.status(404).json(err);
        });

});

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`)
});