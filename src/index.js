const express = require('express');
//const router = express.Router();
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const mongoStore = require('connect-mongodb-session')(session);

const routes = require('./routes/routes');

const MONGODB_URI =
	'mongodb+srv://titevar:aoKfl67Husa_d78GH@cluster0-tpkz7.mongodb.net/logsys01?retryWrites=true&w=majority';

const port = process.env.PORT || 3000;
const store = new mongoStore({
	uri        : MONGODB_URI,
	collection : 'sessions'
});

app.use(session({ secret: '$100000', resave: false, saveUninitialized: false, store: store }));
app.use(routes);
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

mongoose
	.connect(MONGODB_URI, {
		useNewUrlParser    : true,
		useCreateIndex     : true,
		useUnifiedTopology : true
	})
	.then((result) => {
		app.listen(port, () => {
			console.log('server is up and connected port ' + port);
		});
	})
	.catch((err) => {
		console.log(err);
	});
