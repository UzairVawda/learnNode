var express = require('express');
var router = express.Router();
var db = require('monk')('localhost:27017/test');
var userData = db.get('user-data')

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('delete', { title: 'Delete' });
});

router.get('/get-data', function(req, res, next) {

    userData.find({}).then((docs) => {
        res.render('delete', { title: 'Delete', items: docs })
    });
});

router.post('/', function(req, res, next) {
    var id = req.body.id;
    userData.remove(id);
    res.redirect("delete")
});

module.exports = router;