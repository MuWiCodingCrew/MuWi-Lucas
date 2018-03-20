var express = require('express');
var router = express.Router();

var User = require('../models/user');
var global = require('../global.js');

// Get Homepage
router.get('/', ensureAuthenticated, function(req, res){
	
	let sql = `SELECT * FROM tUser WHERE EMail = '${req.user.username}'`;
	let query = global.sqldb.query(sql, (err, result) => {
		if(err){
			throw err;
		}

		console.log('naaaaaaaaa: \n', result);
	});
	res.render('index');
});

// Check, ob User angemeldet ist
function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		req.flash('success_msg','Bitte loggen Sie sich ein, um Zugriff auf MuWi zu erhalten.');
		res.redirect('/users/login');
	}
}

module.exports = router;