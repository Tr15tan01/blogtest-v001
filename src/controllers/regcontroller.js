const bcrypt = require('bcryptjs');

const User = require('../models/usermodel');

const Post = require('../models/postmodel');

const Draft = require('../models/draftmodel');

exports.getPost = (req, res, next) => {
	res.render('post');
};

exports.getAbout = (req, res, next) => {
	res.render('about', {
		keywords: 'about, about us, who we are',
		description: 'we are leading',
		author: 'tristan varamashvili',
		title: 'About Us'
	});
};

exports.getRegister = (req, res, next) => {
	res.render('register', {
		pageTitle            : 'register00000',
		errorMessageName     : '',
		errorMessageEmail    : '',
		errorMessagePassword : '',
		errorMessageAge      : ''
	});
};

exports.getLogin = (req, res, next) => {
	res.render('login', { pageTitle: 'login', errorMessageEmail: '', inputValue: '' });
};

exports.getIndex = (req, res, next) => {
	Post.find({}, function(err, posts) {
		// var postMap = '';
		// posts.forEach(function(post) {
		// 	postMap = postMap + `<li><a href="#"> ${post.heading} </a> </li>`;
		// });
		linkAddress = posts.heading;
		return res.render('', { linkAddress: linkAddress, post: posts });
	})
		.sort('-dateCreated')
		.exec();
};

exports.getCms = (req, res, next) => {
	res.render('cms');
};

exports.getCms1 = (req, res, next) => {
	res.render('cms1');
};

exports.postRegister = (req, res, next) => {
	const name = req.body.name;
	const email = req.body.email;
	const password = req.body.password;
	const passCheck = req.body.password.length;
	const age = req.body.age;
	User.findOne({ email: email })
		.then((userDoc) => {
			if (userDoc) {
				//console.log('user exists');
				return res.render('register', {
					pageTitle            : 'reguster',
					errorMessageName     : '',
					errorMessageEmail    : 'user exists',
					errorMessagePassword : '',
					errorMessageAge      : ''
				});
			}
			return bcrypt.hash(password, 10).then((hashedPassword) => {
				//console.log(password);
				const user = new User({
					name     : name,
					email    : email,
					password : hashedPassword,
					age      : age
				});
				user.save(function(error) {
					if (error) {
						error.errors['name']
							? (errorMessageName = error.errors['name'].message)
							: (errorMessageName = '');
						error.errors['email']
							? (errorMessageEmail = error.errors['email'].message)
							: (errorMessageEmail = '');
						passCheck < 6
							? (errorMessagePassword = 'password must be minimm 6')
							: (errorMessagePassword = '');
						error.errors['age'] ? (errorMessageAge = error.errors['age'].message) : (errorMessageAge = '');
						//console.log(error.errors['password'].message)
						// console.log('fuckin error', error.errors['age'].message);
						//console.log('fuckin error', error);
						return res.render('register', {
							pageTitle            : 'regeester',
							errorMessageName     : errorMessageName,
							errorMessageEmail    : errorMessageEmail,
							errorMessagePassword : errorMessagePassword,
							errorMessageAge      : errorMessageAge
						});
					}
					else {
						//console.log('else');
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
	//console.log(req.session);
	User.findOne({ email: email })
		.then((user) => {
			if (!user) {
				// req.flash('error', 'Invalid email or password.');
				//console.log('user or pass problem');
				return res.render('login', {
					errorMessageEmail : 'user or pass prob',
					pageTitle         : 'login',
					inputValue        : ''
				});
			}
			bcrypt
				.compare(password, user.password)
				.then((doMatch) => {
					if (doMatch) {
						//console.log(req.session, 'sesione');
						req.session.isLoggedIn = true;
						req.session.user = user;
						return req.session.save((err) => {
							//console.log('err', err);
							//console.log('logged');
							return res.redirect('cms');
						});
					}
					res.render('login', { errorMessageEmail: 'pass prob', pageTitle: 'login', inputValue: email });
					//console.log('password problem');
				})
				.catch((err) => {
					//console.log(err);
					res.redirect('/login');
				});
		})
		.catch((err) => console.log(err));
};

var multer = require('multer');
// const getStream = require('get-stream')

var storage = multer.diskStorage({
	destination : function(req, file, cb) {
		cb(null, 'src/public/img/images');
	},
	filename    : function(req, file, cb) {
		cb(null, file.fieldname + '-' + Date.now() + file.originalname);
		//console.log(file)
	}
});

var upload = multer({ storage: storage });

exports.uploadImage = upload.single('image');
const sharp = require('sharp');

exports.postCms = (req, res, next) => {
	const firstLetterUpperCaseHyph = (str) => {
		return str.toLowerCase().split(' ').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join('-');
	};

	const firstLetterUpperCase = (str) => {
		return str.toLowerCase().split(' ').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
	};
	console.log('file ', req.file)
	sharp(req.file.path)
		.resize({ height: 100, width: 100 })
		.toFile(req.file.destination + '/small/' + req.file.filename)
		.then(function(newFileInfo) {
			console.log('Image Resized', newFileInfo);
		})
		.catch(function(err) {
			console.log('Got Error');
		});

	title = firstLetterUpperCase(req.body.title);
	heading = firstLetterUpperCase(req.body.heading);
	subheading = firstLetterUpperCase(req.body.subheading);
	imageurl = 'img/images/' + req.file.filename;
	smallImageUrl = 'img/images/small/' + req.file.filename;
	content = req.body.content;
	link = firstLetterUpperCaseHyph(req.body.heading);
	keywords = req.body.keywords;
	description = req.body.description;
	author = firstLetterUpperCase(req.body.author);
	dateCreated = new Date();
	//console.log(keywords);
	const post = new Post({
		title       : title,
		heading     : heading,
		subheading  : subheading,
		imageurl    : imageurl,
		smallImageUrl: smallImageUrl,
		content     : content,
		link        : link,
		keywords    : keywords,
		description : description,
		author      : author,
		dateCreated : dateCreated
	});

	post.save(res.render('cms'), function(err) {
		console.log(err);
	});
};

exports.draftCms = (req, res, next) => {
	title = req.body.title;
	heading = req.body.heading;
	subheading = req.body.subheading;
	imageurl = 'img/images/' + req.file.filename;
	content = req.body.content;
	link = req.body.heading.split(' ').join('-').slice(0, -1);
	keywords = req.body.keywords;
	description = req.body.description;
	author = req.body.author;
	dateCreated = new Date().toDateString();
	//console.log(keywords);
	const draft = new Draft({
		title       : title,
		heading     : heading,
		subheading  : subheading,
		imageurl    : imageurl,
		content     : content,
		link        : link,
		keywords    : keywords,
		description : description,
		author      : author,
		dateCreated : dateCreated
	});

	draft.save(res.render('cms'), function(err) {
		console.log(err);
	});
};

exports.postCms1 = (req, res, next) => {
	//console.log(req.file);
	res.render('cms1');
};

exports.getPost2 = (req, res, next) => {
	Post.findOne({ heading: 'post2' }).then((post) => {
		return res.render('post2', { heading: post.heading, subheading: post.subheading, content: post.content });
	});
	//res.render('post2', { heading: 'test is a good validation for this and ha ha ha'})
};

exports.getLogOut = (req, res, next) => {
	req.session.isLoggedIn = false;
	req.session.destroy();
	res.redirect('/login');
	// res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
	// res.header('Expires', '-1');
	// res.header('Pragma', 'no-cache');

	//console.log('session endded')
};
