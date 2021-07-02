const kafkaLoader = require('../kafka');
const cortex = require('./notify');
const {configs} = require('../../config/config')



var consume = async () => {

    console.log(kafkaLoader)
    let kafka = await kafkaLoader.load()//.then((kf)=>console.log(kf));
    console.log("kafka consumer")

    console.log(kafka)

    const consumer = kafka.consumer({ groupId: configs.kafka.consumer.groupId })

    let topics = configs.kafka.consumer.topics;


    console.log("consumers initializing!")

    await consumer.connect().then((val)=>console.log("consumer connected", val))

    // console.log("consumer connected")
    
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
            // key: message.key,
            // value: message.value,
            key: message.key? message.key.toString() : '',
            value: message.value ? message.value.toString() : '',
            size: message.size,
            attributes: message.attributes
        }

        console.log(msg)

        cortex.notify(msg);


    },
    })
}


exports.startConsuming =  consume;