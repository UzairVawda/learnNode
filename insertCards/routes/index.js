var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Welcome', condition: true, anyArray: ['cat', 'dog', 'fish'] });
});

module.exports = router;