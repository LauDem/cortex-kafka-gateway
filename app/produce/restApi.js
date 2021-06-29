const express = require('express');
const producer = require('./produce')

const app = express();

app.use(express.json())

var errorHandler = (err, req, res, next) => {
    console.error(err.message)
    res.status(500).send('Message couldnt be produced to broker : '+err.message)
}

app.use(errorHandler)

app.post('/topics/:topic', (req,res) => {
    producer.produce(
        req.params.topic,
        req.body.messages,
        req.body.acks,
        req.body.timeout,
        req.body.compression
    )
    .then(
        res
        .status(200)
        .send("Successfully posted to topic "+req.params.topic))
})

app.get('*', (req, res) => {
    res.status(404).send("REST endpoint not found! Please produce your message to HostName.tld/topics/YourTopic");
    
})


exports.startListening  = app.listen(8080, (err) => {
    
    err ? 
        console.error(err) 
        : console.log('REST API started')
  })

