// start the rest api

const { CompressionTypes } = require('kafkajs');
const { kafka } = require('../kafka');

const producer = kafka.producer();

const obj = {
    foo: "bar",
    bar: "foo"
}

async function produce( topic, messages, acks = -1, timeout = 3000, compression = CompressionTypes.None){

    await producer.connect()

    console.log("producer connected")

    await producer.send({
        topic: 'mockup-topic-for-poc',
        messages: [
            { value: "Hello Kafka, I'm the Cortex node layer!" },
            { key: 'key1', value: 'hello world', partition: 0 },
            { key: 'key2', value: JSON.stringify(obj), partition: 0, timestamp: new Date('now'), headers }
        ],
    })

    await producer.disconnect()
}

exports.produce = produce;
