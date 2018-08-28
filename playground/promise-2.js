const request = require('request');

var geocodeAddress = (address) => {
    return new Promise((resolve, reject) => {
        var encodedAddress = encodeURIComponent(address);
            
        request({
            url: `http://www.mapquestapi.com/geocoding/v1/address?key=OZXW5Ls6PxUh6VNlIaj1wxSNOQGA3pte&location=${encodedAddress}`,
            json: true
        }, (error, response, body) => {
            if (error) {
                reject('Unable to connect to MapQuest servers.');
            } else if (body.info.statuscode === 400) {
                reject('User did not provide an address.');
            } else {
                resolve({
                    address: body.results[0].providedLocation.location,
                    latitude: body.results[0].locations[0].latLng.lat,
                    longitude: body.results[0].locations[0].latLng.lng
                });
            }
        });
    });
};

geocodeAddress('').then((location) => {
    console.log(JSON.stringify(location, undefined, 2));
}, (errorMessage) => {
    console.log(errorMessage);
});