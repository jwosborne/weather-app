const request = require('request');
const yargs = require('yargs');

const argv = yargs
    .options({
    a: {
        demand: true,
        alias: 'address',
        describe: 'Address to fetch weather for',
        string: true
    }
})
.help()
.alias('help', 'h')
.argv;

console.log(argv);
var encodedAddress = encodeURIComponent(argv.address)

request({
    url: `http://www.mapquestapi.com/geocoding/v1/address?key=OZXW5Ls6PxUh6VNlIaj1wxSNOQGA3pte&location=${encodedAddress}`,
    json: true
}, (error, response, body) => {
    if (error) {
        console.log('Unable to connect to MapQuest servers.');
    } else if (body.info.statuscode === 400) {
        console.log('User did not provide an address.');
    } else {
        console.log(`Address: ${body.results[0].providedLocation.location}`);
        console.log(`Latitude: ${body.results[0].locations[0].latLng.lat}`);
        console.log(`Longitude: ${body.results[0].locations[0].latLng.lat}`);
    }
});