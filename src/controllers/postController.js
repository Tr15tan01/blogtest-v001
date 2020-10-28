const Post = require('../models/postmodel');

exports.getVarPost = (req, res, next) => {
	const postToShow = req.url.substring(1);
	//console.log(req.url, postToShow);
	Post.findOne({ link: postToShow }).then((post) => {
		if (!post) {
			return res.status(404).render('404', {keywords: '404 error', description: 'Not Found, 404 error', author: 'me', title: '404 Error'});
		}
		//console.log(post.dateCreated.toISOString().slice(0,10) + ' - ' + post.dateCreated.toISOString().slice(12,16))
		res.render('post', {
			title: post.title,
			heading: post.heading,
			imageurl: post.imageurl,
			smallImageUrl: post.smallImageUrl,
			subheading: post.subheading,
			content: post.content,
			keywords: post.keywords,
			description: post.description,
			author: post.author,
			dateCreated: post.dateCreated
		});
	});
};

exports.getLink = (req, res, next) => {
	Post.find({}, function(err, posts) {
		return res.render('in', { linkAddress3: varPost, linkAddress4: 'post2', post: posts });
	});
};
