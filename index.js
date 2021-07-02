const consumers = require('./app/consume/consume');

const restApi = require('./app/produce/restApi');

async function start(){

    await consumers.startConsuming();

    await restApi.startListening();

}

start();


