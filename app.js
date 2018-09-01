const YARGS = require('yargs');
const AXIOS = require('axios');

const argv = YARGS
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

AXIOS.get(geocodeUrl).then((response) => {
  if (response.data.info.statuscode === 400) {
    throw new Error('User did not provide an address.');
  }
  var lat = response.data.results[0].locations[0].latLng.lat;
  var lng = response.data.results[0].locations[0].latLng.lng;
  var city = response.data.results[0].locations[0].adminArea5;
  var state = response.data.results[0].locations[0].adminArea3;
  console.log(`${city}, ${state}`);
  var weatherUrl = `https://api.forecast.io/forecast/4a04d1c42fd9d32c97a2c291a32d5e2d/${lat},${lng}`;
  return AXIOS.get(weatherUrl);
}).then((response) => {
  var summary = response.data.currently.summary;
  var temperature = response.data.currently.temperature;
  var apparentTemperature = response.data.currently.apparentTemperature;
  console.log(summary);
  console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}.`);
}).catch((e) => {
  if (e.code === 'ENOTFOUND') {
    console.log('Unable to connect to API servers.')
  } else {
    console.log(e.message);
  }
});