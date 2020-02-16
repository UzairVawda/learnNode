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
    res.render('delete', { title: 'Delete' });
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
            res.render('delete', { title: 'Delete', items: resultArray })
        });
    });
});

router.post('/', function(req, res, next) {
    console.log("hit delete on update")
    var id = req.body.id;

    MongoClient.connect(url, function(err, client) {
        assert.equal(null, err);
        const db = client.db(dbName);
        db.collection('user-data').deleteOne({ "_id": MongoObject(id) }, function(error, result) {
            assert.equal(null, error);
            console.log("deleted")
            client.close();
        })
    })

    res.redirect("delete")
});

module.exports = router;