var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');

// Register
router.get('/register', function(req, res){
	res.render('register');
});

// Login
router.get('/login', function(req, res){
	res.render('login');
});

// Register User
router.post('/register', function(req, res){
	var name = req.body.name;
	var email = req.body.email;
	var username = req.body.username;
	var password = req.body.password;
	var password2 = req.body.password2;

	// Validation
	req.checkBody('name', 'Das Feld \'Name\' darf nicht leer sein.').notEmpty();
	req.checkBody('email', 'Das Feld \'Email\' darf nicht leer sein.').notEmpty();
	//req.checkBody('email', 'Dies ist keine valide Email-Adresse.').isEmail();
	req.checkBody('username', 'Das Feld \'Benutzername\' darf nicht leer sein.').notEmpty();
	req.checkBody('password', 'Das Feld \'Passwort\' darf nicht leer sein.').notEmpty();
	req.checkBody('password2', 'Das Feld \'Passwort bestätigen\' darf nicht leer sein.').notEmpty();
	req.checkBody('password2', 'Die Passwörter sind nicht identisch.').equals(req.body.password);

	var errors = req.validationErrors();

	if(errors){
		res.render('register',{
			errors:errors
		});
	} else {
		var newUser = new User({
			name: name,
			email:email,
			username: username,
			password: password
		});

		User.createUser(newUser, function(err, user){
			if(err) throw err;
			console.log(user);
		});

		req.flash('success_msg', 'Sie haben sich erfolgreich registriert und können sich nun einloggen.');

		res.redirect('/users/login');
	}
});

// Login User
passport.use(new LocalStrategy(
 function(username, password, done) {
	 User.getUserByUsername(username, function(err, user){
		 if(err) throw err;
		 if(!user){
			 return done(null, false, {message: 'Unbekannter Benutzername.'});
		 }
		 
		 User.comparePassword(password, user.password, function(err, isMatch){
			 if(err) throw err;
			 if(isMatch){
				 return done(null, user);
			 } else {
				 return done(null, false, {message: 'Passwort ist inkorrekt.'});
			 }
		 });
	 });
  }));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

router.post('/login',
  passport.authenticate('local', {successRedirect:'/', failureRedirect:'/users/login',failureFlash: true}),
  function(req, res) {
    res.redirect('/');
  });

// Logout
router.get('/logout', function(req, res){
	req.logout();

	req.flash('success_msg', 'Sie wurden erfolgreich ausgeloggt.');

	res.redirect('/users/login');
});

module.exports = router;