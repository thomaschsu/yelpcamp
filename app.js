const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static('public'))

let campgrounds = [
    { name: 'Salmon Creek', image: 'images/camp1.jpg' },
    { name: 'Granite Hill', image: 'images/camp2.jpg' },
    { name: 'Mountain Goat\'s Rest', image: 'images/camp3.jpg' },
    { name: 'Mountain Goat\'s Rest', image: 'images/camp3.jpg' },
    { name: 'Salmon Creek', image: 'images/camp1.jpg' },
    { name: 'Granite Hill', image: 'images/camp2.jpg' },
    { name: 'Mountain Goat\'s Rest', image: 'images/camp3.jpg' }
];

app.get('/', function(req, res){
    res.render('landing');
});

app.get('/campgrounds', function(req, res){
    res.render('campgrounds', {campgrounds: campgrounds});
});

app.post('/campgrounds', function(req, res){
    // get data from form and add to campgrounds array
    let name = req.body.name;
    let image = req.body.image;
    let newCampground = {name: name, image: image}
    campgrounds.push(newCampground)

    //redirect back to campgrounds page
    res.redirect('/campgrounds');
});

app.get('/campgrounds/new', function(req, res){
    res.render('new');
});

app.listen(3000, function(){
    console.log('Application running!');
});