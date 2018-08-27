const request = require('request');

var geocodeAddress = (address, callback) =>  {
    var encodedAddress = encodeURIComponent(address);
    
    request({
        url: `http://www.mapquestapi.com/geocoding/v1/address?key=OZXW5Ls6PxUh6VNlIaj1wxSNOQGA3pte&location=${encodedAddress}`,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback('Unable to connect to MapQuest servers.');
        } else if (body.info.statuscode === 400) {
            callback('User did not provide an address.');
        } else {
            callback(undefined, {
                address: body.results[0].providedLocation.location,
                latitude: body.results[0].locations[0].latLng.lat,
                longitude: body.results[0].locations[0].latLng.lat
            });
        }
    });
};

module.exports = {
    geocodeAddress
};