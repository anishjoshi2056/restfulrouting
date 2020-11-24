const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var methodOverride = require('method-override')
const PORT = 5000;

//Enabling Static Files
app.use(express.static('public'));
app.use('/css',express.static(__dirname + "public/css"));
app.use('/js',express.static(__dirname + "public/js"));
app.use('/images',express.static(__dirname + "public/images"));
//Enabling ejs Files
app.set('views','./src/views');
app.set('view engine','ejs');
//Enable body-parser
app.use(bodyParser.urlencoded({extended:true}));
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'));
//Routes

const crudRoute = require('./src/routes/crudRoute');
// redirecting the '/' to '/comments';
app.get('/',(req,res)=> {
    res.redirect('/comments');
})
app.use('/comments',crudRoute);

app.listen(PORT,() => {
    console.log('Server Started!!');
})