const express = require('express');
const router = express.Router();
const { getPost } = require('../controllers/post-controller'); 
const createPath = require('../helpers/create-path');
const Post = require('../pages/models/post.js');


router.get('/', (req, res) => {
    const title = 'Home';
    res.render(createPath('index'), { title });
});

router.get('/user', (req, res) => {
    const title = 'User';
    res.render(createPath('user'), { title });
});

router.get('/login', (req, res) => {
    const title = 'Login page';
    res.render(createPath('login'), { title });
});

router.get('/end', (req, res) => {
    const title = 'End page';
    res.render(createPath('end'), { title });
});

router.get('/post', (req,res) => {
    const title = 'post';
    Post
        .find()
        .then((posts) => res.render(createPath('post'), { posts, title}))
        .catch((err) => {
            console.log(err.message);
            res.render(createPath('error'), { title: 'Error' });
        });
});

router.get('/post/:id', getPost);

router.delete('/posts/:id', (req, res) => {
    const title = 'post';
    Post
        .findByIdAndDelete(req.params.id)
        .then(result => {
            res.send(200);
        })
        .catch((err) => {
            console.log(err.message);
            res.render(createPath('error'), { title: 'Error' });
        });
});

router.get('/edit/:id', (req, res) => {
    const title = 'edit';
    Post
        .findById(req.params.id)
        .then((post) => res.render(createPath('edit-post'), { post, title }))
        .catch((err) => {
            console.log(err.message);
            res.render(createPath('error'), { title: 'Error' });
        });
});

router.put('/edit/:id', (req, res) => {
    const { author, text } = req.body;
    const { id } = req.params; 
    Post
        .findByIdAndUpdate(id, { author, text })
        .then(result => res.redirect(`/post/${id}`))
        .catch((err) => {
            console.log(err.message);
            res.render(createPath('error'), { title: 'Error' });
        });
});

router.get('/posts', (req, res) => {
    const title = 'Posts';
    Post
        .find()
        .sort({ createdAt: -1 })
        .then((posts) => res.render(createPath('posts'), { posts, title}))
        .catch((err) => {
            console.log(err.message);
            res.render(createPath('error'), { title: 'Error' });
        });
});

router.post('/add-post', (req, res) => {
    const { text, author} = req.body;
    const post = new Post({ text, author });
    post
        .save()
        .then((result) => {
            const post = result;
            res.render(createPath('post'), { title: 'post', post })}
            )
        .catch(err => {
            console.log(err.message)
            res.render(createPath('error'), { title: 'Error' })    
        })
});

router.get('/add-post', (req, res) => {
    const title = 'add';
    res.render(createPath('add-post'), { title });
});

module.exports = router;
