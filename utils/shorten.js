/*
Author: chankruze (chankruze@geekofia.in)
Created: Tue Aug 18 2020 02:35:55 GMT+0530 (India Standard Time)

Copyright (c) Geekofia 2020 and beyond
*/

const https = require('https');

module.exports = {
    shorten: function(url, cb) {
        https.get('https://is.gd/create.php?format=simple&url=' + encodeURIComponent(url), function (res) {
            var body = '';
            res.on('data', function(chunk) { body += chunk; });
            res.on('end', function() { cb(body); });
        });
    },
    shortenWithLog: function(url, text, cb) {
        https.get('https://is.gd/create.php?format=simple&logstats=1&url=' + encodeURIComponent(url) + '&shorturl=' + encodeURIComponent(text), function (res) {
            var body = '';
            res.on('data', function(chunk) { body += chunk; });
            res.on('end', function() { cb(body); });
        });
    },
    custom: function(url, text, cb) {
        https.get('https://is.gd/create.php?format=simple&url=' + encodeURIComponent(url) + '&shorturl=' + encodeURIComponent(text), function (res) {
            var body = '';
            res.on('data', function(chunk) { body += chunk; });
            res.on('end', function() { cb(body); });
        });
    },
    customWithLog: function(url, text, cb) {
        https.get('https://is.gd/create.php?format=simple&logstats=1&url=' + encodeURIComponent(url) + '&shorturl=' + encodeURIComponent(text), function (res) {
            var body = '';
            res.on('data', function(chunk) { body += chunk; });
            res.on('end', function() { cb(body); });
        });
    },
    lookup: function(url, cb) {
        https.get('https://is.gd/forward.php?format=simple&shorturl=' + encodeURIComponent(url), function (res) {
            var body = '';
            res.on('data', function(chunk) { body += chunk; });
            res.on('end', function() { cb(body); });
        });
    }
};