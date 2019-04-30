const express = require('express'), 
      app = express(), 
      bodyParser = require('body-parser'), 
      mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/yelp_camp', { useNewUrlParser: true });

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static('public'))

// SCHEMA SETUP
let campgroundSchema = new mongoose.Schema({
    name: String,
    image: String
});

let Campground = mongoose.model('Campground', campgroundSchema);

// Campground.create({name: 'Granite Hill', image: 'images/camp2.jpg'}, function(err, res){
//     if(err) {
//         console.log(err);
//     } else {
//         console.log(res);
//     }
// });

// let campgrounds = [
//     { name: 'Salmon Creek', image: 'images/camp1.jpg' },
//     { name: 'Granite Hill', image: 'images/camp2.jpg' },
//     { name: 'Mountain Goat\'s Rest', image: 'images/camp3.jpg' },
//     { name: 'Mountain Goat\'s Rest', image: 'images/camp3.jpg' },
//     { name: 'Salmon Creek', image: 'images/camp1.jpg' },
//     { name: 'Granite Hill', image: 'images/camp2.jpg' },
//     { name: 'Mountain Goat\'s Rest', image: 'images/camp3.jpg' }
// ];

app.get('/', function(req, res){
    res.render('landing');
});

app.get('/campgrounds', function(req, res){
    // Get all campgrounds from DB
    Campground.find({}, function(err,allCampgrounds){
        if(err) {
            console.log(err);
        } else {
            res.render('campgrounds', { campgrounds: allCampgrounds });
        }
    })
});

app.post('/campgrounds', function(req, res){
    // get data from form and add to campgrounds array
    let name = req.body.name;
    let image = req.body.image;
    let newCampground = {name: name, image: image}
    // campgrounds.push(newCampground)
    // Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err) {
            console.log(err);
        } else {
            //redirect back to campgrounds page
            res.redirect('/campgrounds');
        }
    })
});

app.get('/campgrounds/new', function(req, res){
    res.render('new');
});

app.listen(3000, function(){
    console.log('Application running!');
});