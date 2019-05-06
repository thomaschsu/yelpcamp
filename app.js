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
    image: String,
    description: String
});

let Campground = mongoose.model('Campground', campgroundSchema);

// Campground.create({name: 'Granite Hill', image: 'images/camp2.jpg', description: 'Thi is a huge granite hill, no bathrooms. No water. Beautiful granite!'}, function(err, res){
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
            res.render('index', { campgrounds: allCampgrounds });
        }
    })
});

app.post('/campgrounds', function(req, res){
    // get data from form and add to campgrounds array
    let name = req.body.name;
    let image = req.body.image;
    let desc = req.body.description;
    let newCampground = {name: name, image: image, description: desc}
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

// Show - shows more info about one campground
app.get('/campgrounds/:id', function(req, res){
    // Find the campground with provided ID
    Campground.findById(req.params.id, function(err, foundCampground){
        if (err) {
            console.log(err);
        } else {
            // Render show template with that campground
            res.render('show', {campground: foundCampground});
        }
    });

});

app.listen(3000, function(){
    console.log('Application running!');
});