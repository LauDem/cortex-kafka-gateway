const kafkaLoader = require('../kafka');
const cortex = require('./notify');
const {configs} = require('../../config/config')



async function consume(){

    let kafka = await kafkaLoader.load();
    console.log("kafka consumer")

    const consumer = kafka.consumer({ groupId: configs.kafka.consumer.groupId })

    let topics = configs.kafka.consumer.topics;


    console.log("consumers initializing!")

    await consumer.connect().then((val)=>console.log("connection", val))

    console.log("consumer connected")
    
    for(let i=0; i<topics.length ; i++) {
        await consumer.subscribe(topics[i]) 
    };

    console.log("consumer completed subscription")

    await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
        

        let msg = {
            topic: topic,
            partition: partition,
            timestamp: message.timestamp,
            offset: message.offset,
            headers: message.headers,
            key: message.key? message.key.toString : '',
            value: message.value ? message.value.toString : '',
            size: message.size,
            attributes: message.attributes
        }

        console.log(msg)

        cortex.notify(msg);


    },
    })
}


exports.startConsuming = consume;