const yargs = require('yargs');
const axios = require('axios');

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

var encodedAddress = encodeURIComponent(argv.address);
var geocodeUrl = `http://www.mapquestapi.com/geocoding/v1/address?key=OZXW5Ls6PxUh6VNlIaj1wxSNOQGA3pte&location=${encodedAddress}`

axios.get(geocodeUrl).then((response) => {
  if (response.data.info.statuscode === 400) {
    throw new Error('User did not provide an address.');
  }
  var lat = response.data.results[0].locations[0].latLng.lat;
  var lng = response.data.results[0].locations[0].latLng.lng;
  var weatherUrl = `https://api.forecast.io/forecast/4a04d1c42fd9d32c97a2c291a32d5e2d/${lat},${lng}`;
  console.log(response.data.results[0].providedLocation.location);
  return axios.get(weatherUrl);
}).then((response) => {
  var temperature = response.data.currently.temperature;
  var apparentTemperature = response.data.currently.apparentTemperature;
  console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}.`);
}).catch((e) => {
  if (e.code === 'ENOTFOUND') {
    console.log('Unable to connect to API servers.')
  } else {
    console.log(e.message);
  }
});