var express = require('express');
var router = express.Router();
var db = require('monk')('localhost:27017/test');
var userData = db.get('user-data')

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('insert', { title: 'Insert' });
});

router.get('/get-data', function(req, res, next) {
    userData.find({}).then((docs) => {
        res.render('insert', { title: 'Insert', items: docs })
    });
});

router.post('/', function(req, res, next) {
    var item = {
        title: req.body.title,
        author: req.body.author,
        content: req.body.content
    };

    var insertCheck = userData.insert(item);
    insertCheck.then((docs) => {
        res.redirect("insert");
    });

});

module.exports = router;