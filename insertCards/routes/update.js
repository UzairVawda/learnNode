var express = require('express');
var router = express.Router();
var assert = require('assert');
var url = "mongodb://localhost:27017";
const MongoClient = require('mongodb').MongoClient;
const MongoObject = require('mongodb').ObjectID;
const client = new MongoClient(url);
const dbName = 'test';

var url = 'mongodb://localhost:27017/test';


/* GET home page. */
router.get('/', function(req, res, next) {
    console.log("hit update page")
    res.render('update', { title: 'Update' });
});

router.get('/get-data', function(req, res, next) {
    console.log("hit get data from update")
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
            res.render('update', { title: 'Update', items: resultArray })
        });
    });
});

router.post('/', function(req, res, next) {
    console.log("hit update on update")
    var items = {
        title: req.body.title,
        author: req.body.author,
        content: req.body.content
    }

    var id = req.body.id;

    MongoClient.connect(url, function(err, client) {
        assert.equal(null, err);
        const db = client.db(dbName);
        db.collection('user-data').updateOne({ "_id": MongoObject(id) }, { $set: items }, function(error, result) {
            assert.equal(null, error);
            console.log("updated")
            client.close();
        })
    })

    res.redirect("update")
});

module.exports = router;