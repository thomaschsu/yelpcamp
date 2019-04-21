const express = require('express');
const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'))

app.get('/', function(req, res){
    res.render('landing');
});

app.get('/campgrounds', function(req, res){
    let campgrounds = [
        {name: 'Salmon Creek', image: 'images/camp1.jpg'},
        { name: 'Granite Hill', image: 'images/camp1.jpg'},
        { name: 'Mountain Goat\'s Rest', image: 'images/camp1.jpg'}
    ]
    res.render('campgrounds', {campgrounds: campgrounds});
});

app.listen(3000, function(){
    console.log('Application running!');
});