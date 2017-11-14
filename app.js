'use strict';

const app = require('express')();
const bodyParser = require('body-parser');
const request = require('request');

const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('*', (req, res) => {
  res.send('…');
});

app.post('/utopia', (req, res, next) => {

  let requestURL = 'https://api.spark.io/v1/devices/' + process.env.PARTICLE_DEVICE_ID + '/led/';
  let responseText = '';
  let pos = 0;

  switch (req.body.result.action) {
    case 'office.ledster.green.on':
      responseText = 'Turning the green led on.';
      pos = 'green_on';
      break;

    case 'office.ledster.green.off':
      responseText = 'Turning the green led off.';
      pos = 'green_off';
      break;

    case 'office.ledster.red.on':
      responseText = 'Turning the red led on.';
      pos = 'red_on';
      break;

    case 'office.ledster.red.off':
      responseText = 'Turning the red led off.';
      pos = 'red_off';
      break;

    case 'office.utopia.screen.up':
      responseText = 'Raising the screen';
      pos = 0;
      break;

    case 'office.utopia.screen.down':
      responseText = 'Lowering the screen';
      pos = 180;
      break;

    default:
      responseText = '';
      pos = '0';
      break;
  }

  request.post(requestURL, {
    form: {
      params: pos,
      access_token: process.env.PARTICLE_ACCESS_TOKEN
    }
  });

  res.json({
    speech: responseText,
    displayText: responseText,
    data: {},
    contextOut: [],
    source: req.body.originalRequest.source,
    followupEvent: {}
  });

});

app.listen(port, () => {
  console.log('Listening on port ' + port);
});
