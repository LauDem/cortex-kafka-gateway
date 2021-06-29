const { Kafka } = require('kafkajs')
const { configs } = require('../config/config')

let brokers = [];

configs.kafka.brokers.forEach(
  (broker) => {
    brokers.push(broker.host+':'+broker.port)
  }
)

console.log('the brokers are', brokers)

const kafka = new Kafka({
  clientId: configs.kafka.clientId,
  brokers: brokers
})

exports.kafka = kafka;





