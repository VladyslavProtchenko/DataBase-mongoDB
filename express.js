const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const postRoutes = require('./routes/post-routes');
const createPath = require('./helpers/create-path');


const app = express();
const PORT = 3000;
const db = 'mongodb+srv://Vladyslav:papacarlo2000@cluster0.sfkkr.mongodb.net/first?retryWrites=true&w=majority';


mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((res) => {console.log('We connected to database')}) 
    .catch(err => console.log(err.message))


app.set('view engine', 'ejs');

app.listen(PORT, (err) =>  err ? console.log(err) : console.log('server is listening') );

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(express.urlencoded({ extended: false}));
app.use(methodOverride('_method'));


app.use(postRoutes);

app.use((req,res) => {
    const title = 'Pisdec';
    res
        .status(404)
        .render(createPath('error'), { title })
})
