const bcrypt = require('bcryptjs');

const User = require('../models/usermodel');

exports.getBackgrounds = (req, res, next) => {
	res.render('backgrounds');
};

exports.getRegister = (req, res, next) => {
	res.render('register', { pageTitle: 'register00000', errorMessageName: '', errorMessageEmail: '', errorMessagePassword: '', errorMessageAge: '' });
};

exports.getLogin = (req, res, next) => {
	res.render('login', { pageTitle: 'login', errorMessage: '' });
};

exports.getIndex = (req, res, next) => {
	res.render('', { pageTitle: 'main' });
};

exports.postRegister = (req, res, next) => {
	const name = req.body.name;
	const email = req.body.email;
	const password = req.body.password;
	const age = req.body.age;
	User.findOne({ email: email })
		.then((userDoc) => {
			if (userDoc) {
				console.log('user exists');
				return res.render('register', { pageTitle: 'reguster', errorMessage: 'user exists' });
			}
			return bcrypt.hash(password, 12).then((hashedPassword) => {
				const user = new User({
					name     : name,
					email    : email,
					password : hashedPassword,
					age      : age
				});
				user.save(function(error) {
					if (error) {
							errorMessageName = error.errors['name'].message;
							errorMessageEmail = error.errors['email'].message;
							errorMessagePassword = error.errors['password'];
							errorMessageAge = error.errors['age'].message;
							console.log(error.errors['password'])
							console.log('password', password)
						
						// console.log('fuckin error', error.errors['age'].message);
						console.log('fuckin error');
						return res.render('register', {
							pageTitle: 'regeester',
							errorMessageName: errorMessageName,
							errorMessageEmail: errorMessageEmail, 
							errorMessagePassword: errorMessagePassword,
							errorMessageAge: errorMessageAge
						});
					}
					else {
						console.log('else');
						return res.redirect('/login');
					}
				});
			});
		})
		.catch((err) => {
			console.log('fuckin error', err);
			//return res.render('register', { pageTitle: 'regeester', errorMessage: error.errors['age'].message })
		});
};

exports.postLogin = (req, res, next) => {
	const email = req.body.email;
	const password = req.body.password;
	req.session.isLoggedIn = true;
	console.log(req.session);
	User.findOne({ email: email })
		.then((user) => {
			if (!user) {
				// req.flash('error', 'Invalid email or password.');
				console.log('user or pass problem');
				return res.render('login', { errorMessage: 'user or pass prob', pageTitle: 'login' });
			}
			bcrypt
				.compare(password, user.password)
				.then((doMatch) => {
					if (doMatch) {
						console.log(req.session, 'sesione');
						req.session.isLoggedIn = true;
						req.session.user = user;
						return req.session.save((err) => {
							console.log(err);
							console.log('logged');
							return res.redirect('/');
						});
					}
					res.render('login', { errorMessage: 'pass prob', pageTitle: 'login' });
					console.log('password problem');
				})
				.catch((err) => {
					console.log(err);
					res.redirect('/login');
				});
		})
		.catch((err) => console.log(err));
};
