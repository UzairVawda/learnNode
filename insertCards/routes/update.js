var express = require('express');
var router = express.Router();
var db = require('monk')('localhost:27017/test');
var userData = db.get('user-data')


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('update', { title: 'Update' });
});

router.get('/get-data', function(req, res, next) {
    userData.find({}).then((docs) => {
        res.render('update', { title: 'Update', items: docs })
    });
});

router.post('/', function(req, res, next) {
    var item = {
        title: req.body.title,
        author: req.body.author,
        content: req.body.content
    }

    var id = req.body.id;
    var checkUpdate = userData.update({ "_id": id }, item);
    checkUpdate.then((docs) => {
        res.redirect("update");
    }).catch(function() {
        console.log("SIR YOU FUCKED UP ");
        res.redirect("update");
    });
});

module.exports = router;