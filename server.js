const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname+ '/views/partials'); //Registers the Partial template files in Handlebar
app.set('view engine', 'hbs');    //Sets the view engine to Handlebar

//Express Middlewares: app.use . If the middleware is using a callback function, it must run next() inside it to continue to next function.
app.use((req, res, next) => {
    var now = new Date().toString();
    var serverlog = `${now} : ${req.ip} - ${req.method} ${req.url}`;
    fs.appendFile('server.log', serverlog+'\n', 
        (err) =>{
                console.log('Unable to append to server.log file.');
        });
    next();
});

//Maintenance Mode: This middleware doesnt have a next(); so, the it is preventing this file running any further. 
// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

//Make the whole Public directory of the server accissble and public. Any static files inside this folder can be accessible by browser.
app.use(express.static(__dirname + '/public'));
//---------------


hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) =>{
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    //res.send('You Know My Name');
    // res.send({
    //     Name: 'Towfiq',
    //     Age: 31,
    //     Hobbies: ['Computer', 'Traveling', 'Painting']
    // });
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'This is a Custom Welcome Message that shows only on homepage of our site.'
    });

});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });
});

app.get('/bad', (req, res) => {
    res.send({errorMessage: 'This is an Error Message!'});
});




app.listen(3000, () => {
    console.log('Server is running on port 3000');
});