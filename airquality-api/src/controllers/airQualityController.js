const airQuality = require('express').Router();

const {airQualityCallback, airQualityPromise} = require('../helpers/airQuality');

let url = 'https://api.openaq.org/v2/latest';


airQuality.get('/callback', (req, res) => {
    airQualityCallback(url, (err, resp) => {
        if (err) {
            return res.status(500).send("Some thing went wrong");
        } else {
            return res.status(200).send(resp);
        }
    });
});

airQuality.get('/promises', (req, res) => {
    airQualityPromise(url).then(resp => {
        return res.status(200).send(resp);
    }).catch(err => {
        return res.status(500).send("Some thing went wrong");
    });
});


airQuality.get('/callbackHell', (req, res) => {
    let totalResults = [];
    airQualityCallback('https://api.openaq.org/v2/latest?page=1', function(err, data) {
        if (err) {
            return res.status(500).send("Some thing went wrong");
        } else {
            airQualityCallback('https://api.openaq.org/v2/latest?page=2', function(err2, data2) {
                if (err2) {
                    return res.status(500).send("Some thing went wrong ", );
                } else {
                    airQualityCallback('https://api.openaq.org/v2/latest?page=3', function(err3, data3) {
                        if (err3) {
                            return res.status(500).send("Some thing went wrong");
                        } else {
                            totalResults.push(data);
                            totalResults.push(data2);
                            totalResults.push(data3);
                            return res.status(200).send(totalResults);
                        }
                    })
                }
            })
        }
    });
})

airQuality.get('/promiseHeaven', (req, res) => {
    let totalResults = [];
    airQualityPromise('https://api.openaq.org/v2/latest?page=1').then(data => {
        airQualityPromise('https://api.openaq.org/v2/latest?page=2').then(data2 => {
            airQualityPromise('https://api.openaq.org/v2/latest?page=3').then(data3 => {
                totalResults.push(data);
                totalResults.push(data2);
                totalResults.push(data3);
                return res.status(200).send(totalResults);
            }).catch(err3 => {
                return res.status(500).send("Some thing went wrong");
            });
        }).catch(err2 => {
            return res.status(500).send("Some thing went wrong");
        });
    }).catch(err => {
        return res.status(500).send("Some thing went wrong");
    });
});

airQuality.get('/asyncAwaitNonHell', async (req, res) => {
    let totalResults = [];
    try {
        let data1 = await airQualityPromise('https://api.openaq.org/v2/latest?page=1');
        let data2 = await airQualityPromise('https://api.openaq.org/v2/latest?page=2');
        let data3 = await airQualityPromise('https://api.openaq.org/v2/latest?page=3');
        totalResults.push(data1);
        totalResults.push(data2);
        totalResults.push(data3);
        return res.status(200).send(totalResults);
    } catch (err) {
        return res.status(500).send("Some thing went wrong");
    }
});

airQuality.get('/multiplePromises', (req, res) => {
    let promise1 = airQualityPromise('https://api.openaq.org/v2/latest?page=1');
    let promise2 = airQualityPromise('https://api.openaq.org/v2/latest?page=2');
    let promise3 = airQualityPromise('https://api.openaq.org/v2/latest?page=3');
    Promise.all([promise1, promise2, promise3]).then(data => {
        return res.status(200).send(data);
    }).catch(err => {
        return res.status(500).send("Some thing went wrong");
    });
});

module.exports = airQuality;