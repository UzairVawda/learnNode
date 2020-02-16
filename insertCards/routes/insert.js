var express = require('express');
var router = express.Router();
var assert = require('assert');
var url = "mongodb://localhost:27017";
const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(url);
const dbName = 'test';

var url = 'mongodb://localhost:27017/test';

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('insert', { title: 'Insert' });
    console.log("hit insert.js")
});

router.get('/get-data', function(req, res, next) {
    console.log("hit get data")
    var resultArray = []
    MongoClient.connect(url, function(err, client) {
        assert.equal(null, err);
        const db = client.db(dbName);
        var cursor = db.collection('user-data').find();
        cursor.forEach(function(doc, err) {
            assert.equal(null, err);
            resultArray.push(doc)
        }, function() {
            client.close();
            res.render('insert', { title: 'Insert', items: resultArray })
        });
    });
});

router.post('/', function(req, res, next) {
    console.log("hit insert")
    var items = {
        title: req.body.title,
        author: req.body.author,
        content: req.body.content
    }

    MongoClient.connect(url, function(err, client) {
        assert.equal(null, err);
        const db = client.db(dbName);
        db.collection('user-data').insertOne(items, function(error, result) {
            assert.equal(null, error);
            console.log("inserted")
            client.close();
        })
    })

    res.redirect("insert")

});

module.exports = router;