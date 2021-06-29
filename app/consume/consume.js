const { kafka } = require('../kafka');
const cortex = require('./notify');
const {configs} = require('../../config/config')

console.log(configs)
const consumer = kafka.consumer({ groupId: 'test-group' })

let topics = configs.kafka.consumer.topics;



async function consume(){
    console.log("consumers started!")
    await consumer.connect()
    
    for(let i=0; i<topics.length ; i++) {
        await consumer.subscribe(topics[i]) 
    };

    await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
        

        let msg = {
            topic: topic,
            partition: partition,
            timestamp: message.timestamp,
            offset: message.offset,
            headers: message.headers,
            key: message.key.toString,
            value: message.value.toString,
            size: message.size,
            attributes: message.attributes
        }

        cortex.notify(msg);


    },
    })
}


exports.startConsuming = consume;