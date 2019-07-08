// import files and packages up here
const express = require('express');
const morgan = require('morgan');
const axios = require('axios');

// create your express server below
const app = express();

// add your routes and middleware below
app.use(morgan('dev')); 

const cache = {}; 

app.get('/', function(req, res){
    var movieData = req.query;
    var key = Object.keys(movieData);
    var value = Object.values(movieData);
    var url = 'http://www.omdbapi.com/?apikey=8730e0e&'  + key + '=' + encodeURI(value);

    if (cache.hasOwnProperty(value)){
        res.json(cache[value]);
    } else {
        axios.get(url)
        .then(response => {
        cache[value] =  response.data;
        res.send(cache[value]);
        }).catch(err => res.json(err.message));
    }
});

// When making calls to the OMDB API make sure to append the '&apikey=8730e0e' parameter
module.exports = app;