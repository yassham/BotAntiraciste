Twitter = require('twitter');
confTwitter = require('./conf.twitter.js');


// INIT Twitter
client = new Twitter(confTwitter);

monitor = "je suis pas raciste mais";

var moduleAppele = './modules/stream.js';
require(moduleAppele)
