Twitter = require('twitter');
confTwitter = require('./conf.twitter.js');


// INIT Twitter
client = new Twitter(confTwitter);

monitor = "je ne suis pas raciste mais,je suis pas raciste mais,chui pas raciste mais,je suis raciste";

var moduleAppele = './modules/stream.js';
require(moduleAppele)
