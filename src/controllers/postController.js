const Post = require('../models/postmodel');

exports.getVarPost = (req, res, next) => {
	const postToShow = req.url.substring(1);
	//console.log(req.url, postToShow);
	Post.findOne({ link: postToShow }).then((post) => {
		if (!post) {
			return res.status(404).send('404 page');
		}
		//console.log(post.dateCreated.toISOString().slice(0,10) + ' - ' + post.dateCreated.toISOString().slice(12,16))
		res.render('post', { heading: post.heading, imageurl: post.imageurl, subheading: post.subheading, content: post.content });
	});
};

exports.getLink = (req, res, next) => {
	Post.find({}, function(err, posts) {
		return res.render('in', { linkAddress3: varPost, linkAddress4: 'post2', post: posts });
	});
};
