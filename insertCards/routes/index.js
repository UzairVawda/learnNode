var express = require('express');
const { check, validationResult } = require('express-validator');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Form Validation', success: req.session.success, errors: req.session.errors });
    req.session.errors = null;
});

router.post('/submit', [
    //check
    check('email').isEmail().withMessage('Invalid email address'),
    check('password').isLength({ min: 4 }).withMessage('Minimum length password is 4 characters'),
    check('password').isLength({ max: 15 }).withMessage('Maximum length password is 15 characters'),
    check('password').equals('confirmPassword').withMessage('Password\'s do not match!'),

], (req, res) => {
    const errors = validationResult(req);
    console.log(errors.mapped())
    console.log(req.body);
    res.render('index', { title: 'Form Validation', errors: errors.mapped() })

});


module.exports = router;