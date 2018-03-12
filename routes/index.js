var express = require('express');
var router = express.Router();

// Get Homepage
router.get('/', ensureAuthenticated, function(req, res){
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