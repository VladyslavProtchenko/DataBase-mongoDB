const Post = require('../pages/models/post.js');
const createPath = require('../helpers/create-path');

const getPost = (req,res) => {
    const title = 'post';
    Post
        .findById(req.params.id)
        .then((post) => res.render(createPath('post'), { post, title }))
        .catch((err) => {
            console.log(err.message);
            res.render(createPath('error'), { title: 'Error' });
        }); 
};


module.exports = {
    getPost
};