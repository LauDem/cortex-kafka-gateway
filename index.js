const consumers = require('./app/consume/consume');

const restApi = require('./app/produce/restApi');

// const { configs, conf } = require('./config/config')

// console.log(conf, configs)
async function start(){

    await consumers.startConsuming();

    // await restApi.startListening;

}

start();


