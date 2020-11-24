const express = require('express');
const crudRoute = express.Router();
const { v4: uuidv4 } = require('uuid');
let comments = [{
    id:uuidv4(),
    author:'Dale Carnegie',
    comment:'Live each and every moment of your life'
},
{
    id:uuidv4(),
    author:'Norman Vincent Peal',
    comment:'The Grace of God is with you'
},{
    id:uuidv4(),
    author:'Tony Robbins',
    comment:'Actions controls our Emotions'
}]
//Shows all the Comments(index.ejs) [I]
crudRoute.get('/',(req,res)=> {
    res.render('index',{comments})
})
//Create a new Comment
//First we need a form to rendered[N]
crudRoute.get('/new',(req,res) => {
    res.render('new');
})
//Capture the sended data from the from [C]
crudRoute.post('/',(req,res)=> {
    let newComment = req.body;
    newComment.id = uuidv4();
    comments.push(newComment);
    res.redirect('/')
})
//Show more info about the comment [S]
crudRoute.get('/:id',(req,res)=> {
    //Find the comment by using id
    let comment = comments.filter((comment)=> {
        return comment.id === req.params.id;
    })[0]
    //render the comment on show.ejs
    res.render('show',{comment})
})
//Edit the comment from Show more Info [E]
crudRoute.get('/:id/edit',(req,res)=> {
    //Find the comment by using id
    let comment = comments.filter((comment)=> {
        return comment.id === req.params.id;
    })[0]
     //render the comment on edit.ejs
     res.render('edit',{comment})
})
//Updating the comment from Show more Info [U]
crudRoute.patch('/:id',(req,res)=> {
    //Find the comment using id
    let comment = comments.filter((comment)=> {
        return comment.id === req.params.id;
    })[0]
    comment.comment = req.body.comment;
    comment.author = req.body.author;
    res.redirect('/')
})
//Deleting the comment from Show more Info [D]
crudRoute.delete('/:id',(req,res)=> {
    //Find the comment using id
    let Newcomment = comments.filter((comment)=> {
        return comment.id !== req.params.id;
    });
    comments = Newcomment;
    res.redirect('/');
})

module.exports = crudRoute;