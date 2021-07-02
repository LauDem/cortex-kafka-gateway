var https = require('https');
const { configs } = require('../../config/config');


// build authorization header

let auth = configs.cortex.authorization;

let credentialString = auth.username+':'+auth.password;

let buff = Buffer.from(credentialString);

let authHeader = auth.type + ' ' + buff.toString('base64');


// pre-build request body


let body = {
  "Name": configs.cortex.flow,
  "Initiator": configs.cortex.initiator,
  "Arguments": {  }
}

if(configs.cortex.showToken) body.Arguments._CTXSHOWTOKEN=true;


// pre-build request options

let protocol;

configs.cortex.api.https ? protocol = "https://" : protocol = "http://";

let path = '/api/flow/startflow';
if(configs.cortex.api.async) path = path+'async';

const options = {
  hostname: configs.cortex.api.domain,
  port: configs.cortex.api.port,
  path: path,
  method: configs.cortex.api.verb,
  headers: {
    'Content-Type': configs.cortex.api.contentType,
    'Authorization': authHeader
  }
}


// exported notify function

async function notify(message){

  body.Arguments.message = message;
  console.log(JSON.stringify(body));

  // options.headers['Content-Length'] = body.length;

  const req = https.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`)
  
    res.on('data', d => {
      process.stdout.write(d)
    })
  })
  
  req.on('error', error => {
    console.error(error)
  })
  
  
  req.write(JSON.stringify(body))
  req.end()
}

exports.notify = notify;
