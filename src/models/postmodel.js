const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
	title         : {
		type     : String,
		required : true
	},
	heading       : {
		type     : String,
		required : true
	},
	subheading    : {
		type     : String,
		required : true
	},
	content       : {
		type     : String,
		required : true
	},
	imageurl      : {
		type     : String,
		required : true
	},
	smallImageUrl : {
		type     : String,
		required : true
	},
	link          : {
		type        : String,
		required    : true,
		tolowercase : true,
		trim        : true
	},
	keywords      : {
		type     : String,
		required : true
	},
	description   : {
		type     : String,
		required : true
	},
	author        : {
		type     : String,
		required : true
	},
	dateCreated   : {
		type : Date
	}
});

module.exports = mongoose.model('Post', postSchema);
