const consumers = require('./app/consume/consume');

const restApi = require('./app/produce/restApi');


consumers.startConsuming();

restApi.startListening;


