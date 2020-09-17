const bcrypt = require('bcryptjs');

const User = require('../models/usermodel');

exports.getBackgrounds = (req, res, next) => {
	res.render('backgrounds');
};

exports.getRegister = (req, res, next) => {
	res.render('register', { pageTitle: 'register00000', errorMessage: 'testing error messafes' });
};

exports.getLogin = (req, res, next) => {
	res.render('login', { pageTitle: 'login', errorMessage: '' });
};

exports.getIndex = (req, res, next) => {
	res.render('', { pageTitle: 'main' });
};

// exports.postRegister = (req, res, next) => {
// 	const name = req.body.name;
// 	const email = req.body.email;
// 	const password = req.body.password;
// 	const age = req.body.age;
// 	User.findOne({ email: email })
// 		.then((userDoc) => {
// 			if (userDoc) {
// 				console.log(userDoc)
// 				return res.render('register', { errorMessage: 'ეს საცელი უკვე დაკავებულია', pageTitle: 'register' });
// 			}
// 			return bcrypt
// 				.hash(password, 12)
// 				.then((hashedPassword) => {
// 					const user = new User({
// 						name     : name,
// 						email    : email,
// 						password : hashedPassword,
// 						age      : age
// 					});
// 					return user.save();
// 				})
// 				.then((result) => {
// 					res.redirect('/login');
// 				});
// 		})
// 		.catch((err) => {
// 			console.log('err', err)
// 			//console.log('fuckin error', Object.entries(err));
// 			//console.log('fuckin error', err.errors.name.properties.message);
// 			//return res.render('register', {errorMessage: err.errors.name.properties.message, pageTitle: 'ვერ რეგისტრირდები?'})
// 		});
// };

exports.postRegister = (req, res, next) => {
	const name = req.body.name;
	const email = req.body.email;
	const password = req.body.password;
	const age = req.body.age;
	User.findOne({ email: email })
		.then((userDoc) => {
			if (userDoc) {
				console.log('user exists')
				return res.render('register', { pageTitle: 'reguster', errorMessage: 'user exists' });
			}
			return bcrypt
				.hash(password, 12)
				.then((hashedPassword) => {
					const user = new User({
						name     : name,
						email    : email,
						password : hashedPassword,
						age      : age
					});
					return user.save();
				})
				.then((result) => {
					res.redirect('/login');
				});
		})
		.catch((err) => {
			console.log(err);
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
