var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('delete', { title: 'Delete' });
});

router.post('/delete', function(req, res, next) {

});

module.exports = router;