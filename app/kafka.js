const { Kafka } = require('kafkajs')
const { configs } = require('../config/config')
var dns = require('dns');

let brokers = [];

process.env.containerized ? containerized = true : containerized = false;

var dnsLookup = ()=> { return new Promise((resolve, reject)=>{
  dns.lookup('host.docker.internal', (err, ip, family)=>{
    if(err) reject(err)
    if(ip) resolve(ip)
  })

})}

const load = async function load()
{
    for(let broker of configs.kafka.brokers) {

      if((broker.host == "localhost" || broker.host == "127.0.0.1") && containerized) {

        let host = await dnsLookup()
        console.log("host", host)
        
        brokers.push(host+':'+broker.port) 
        continue;
      }

      brokers.push(broker.host+':'+broker.port)


    }

    console.log('the brokers are', brokers)

    let kafka =  new Kafka({
      clientId: configs.kafka.clientId,
      brokers: brokers
    })

    console.log(kafka.brokers)

    return kafka;

}

exports.load = load;





