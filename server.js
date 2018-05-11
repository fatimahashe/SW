
var express = require('express');
var app = express();

/**
 * Module to implement mongodb API
 */
var mongojs = require('mongojs');
var db = mongojs('mongodb://fat:123@ds119090.mlab.com:19090/fat', ['fat']);

/**
 * Parse incoming request bodies
 * @type {Parsers}
 */
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public')); // Add static directory
app.use(bodyParser.json());





/**
 * GET Method to retrieve all the contacts
 */
app.get('/contactlist', function (req, res) {
    // console.log('I received a GET request');

    db.contactlist.find(function (err, docs) {
        // console.log(docs);
        res.json(docs);
    });
});

/**
 * POST Method to update a contact
 */
app.post('/contactlist', function (req, res) {
    // console.log(req.body);
    db.contactlist.insert(req.body, function (err, doc) {
        res.json(doc);
    });
});

/**
 * POST Method to delete a contact
 */
app.delete('/contactlist/:id', function (req, res) {
    var id = req.params.id;
    // console.log(id);
    db.contactlist.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
        res.json(doc);
    });
});

/**
 * POST Method to retrieve a contact
 */
app.get('/contactlist/:id', function (req, res) {
    var id = req.params.id;
    // console.log(id);
    db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
        res.json(doc);
    });
});

/**
 * POST Method to update a contact
 */
app.put('/contactlist/:id', function (req, res) {
    var id = req.params.id;
    // console.log(req.body.name);
    db.contactlist.findAndModify({
            query: {_id: mongojs.ObjectId(id)},
            update: {
                $set: {
                    name: req.body.name,
                    number: req.body.number,
                    job: req.body.job,
                    location: req.body.location
                }
            },
            new: true
        }, function (err, doc) {
            res.json(doc);
        }
    );
});
/*
    Post Method For register
    /register
*/
app.get('/signup', function (req, res) {
    // console.log(req.body);
    res.redirect('index.html');
});
app.post('/signup', function (req, res) {
    // console.log(req.body);
    db.user.insert(req.body, function (err, doc) {
        
        res.json(doc);
    });
});
/*
    Post Method For Login
    /login
*/
app.post('/login', function (req, res) {
    // console.log(req.body);
    var test=false;
    db.user.findOne({username: req.body.username , password: req.body.password}, function (err, doc) {
        //console.log(doc);
        if (doc !== null){
            res.json(doc);
        }
    });
    
});
/*
    Get Method to Signout
    /signout
*/
app.get('/signout', function(req, res) {
    
    
});
app.listen(3000);
console.log("Server running on port 3000");