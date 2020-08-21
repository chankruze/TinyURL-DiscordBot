/*
Author: chankruze (chankruze@geekofia.in)
Created: Fri Aug 21 2020 19:18:52 GMT+0530 (India Standard Time)

Copyright (c) Geekofia 2020 and beyond
*/

const axios = require('axios');
const _PIXEL = 100;

const shorten = (data, callback) => {
    if (data) {
        // json data from caller method
        const longUrl = data.longUrl;
        const logStats = data.logStats;
        const customUrl = data.customUrl;
        const generateQr = data.generateQr;

        // local variables
        let API_REQ_STR = `https://is.gd/create.php?format=json&url=${encodeURIComponent(longUrl)}`;

        if (logStats) {
            API_REQ_STR += `&logstats=1`;
        }

        if (customUrl != null) {
            API_REQ_STR += `&shorturl=${customUrl}`;
        }

        // API Request
        const config = {
            method: 'get',
            url: API_REQ_STR
        };

        axios(config)
            .then((response) => {
                const data = response.data;

                // success responsse to send to callback
                let res = {
                    shorturl: null,
                    qrurl: null,
                    statsurl: null, 
                };

                if (data.shorturl) {
                    // update res[shortUrl]
                    res.shorturl = data.shorturl;

                    if (logStats) {
                        res.statsurl = `https://is.gd/stats.php?url=${res.shorturl.split('/')[3]}`
                    }

                    if (generateQr) {
                        res.qrurl =  `https://api.qrserver.com/v1/create-qr-code/?data=${res.shorturl}`;
                    }

                    // finally call callback
                    callback(res, null);
                } else {
                    // console.log(data);
                    callback(null, data);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
};

// module.exports.run = shorten;

// module.exports = {
//     shorten: shorten,
// };

// or

exports.shorten = shorten;
// exports.otherMethod = function() {};