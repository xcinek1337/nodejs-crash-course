const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');

// express app
const app = express();

const dbURI =
	'mongodb+srv://marcinchodkowski555:qwerty123@node-js.jumllfk.mongodb.net/node-js?retryWrites=true&w=majority&appName=node-js';
mongoose
	.connect(dbURI)
	.then((result) => app.listen(3000))
	.catch((err) => console.log(err));
// listen for requests

// middleware & static files
app.use(express.static('public'));
app.use(morgan('dev'));

// mongoose and mongo sanbox routes
app.get('/add-blog', (req, res) => {
	const blog = new Blog({
		title: 'new blog 2',
		snippet: 'about my new blog',
		body: 'more about my new blog',
	});
	blog
		.save()
		.then((result) => {
			res.send(result);
		})
		.catch((err) => console.log(err));
});

app.get('/all-blogs', (req, res) => {
	Blog.find()
		.then((result) => {
			res.send(result);
		})
		.catch((err) => {
			console.log(err);
		});
});

app.get('/single-blog', (req, res) => {
	Blog.findById('6687e01f6c9aa733c04c8dcc')
		.then((result) => {
			res.send(result);
		})
		.catch((err) => console.log(err));
});

// register view engine
app.set('view engine', 'ejs');
// app.set('views', 'myviews');

app.get('/', (req, res) => {
	const blogs = [
		{ title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur' },
		{ title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur' },
		{ title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur' },
	];
	res.render('index', { title: 'Home', blogs });
});

app.get('/about', (req, res) => {
	res.render('about', { title: 'About' });
});

app.get('/blogs/create', (req, res) => {
	res.render('create', { title: 'Create a new blog' });
});

// 404 page
app.use((req, res) => {
	res.status(404).render('404', { title: '404' });
});
