const request = require('request');

var getWeather = (lat, lng, callback) => {
    request({
        url: `https://api.forecast.io/forecast/4a04d1c42fd9d32c97a2c291a32d5e2d/${lat},${lng}`,
        json: true
      }, (error, response, body) => {
        if (!error && response.statusCode === 200) {
          callback(null, {
              temperature: body.currently.temperature,
              apparentTemperature: body.currently.apparentTemperature  
          });
        } else {
          callback('Unable to fetch weather.');
        }
      });
}

// lat, lng, callback
module.exports.getWeather = getWeather;