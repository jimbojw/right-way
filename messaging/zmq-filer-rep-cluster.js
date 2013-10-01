"use strict";
const
  cluster = require('cluster'),
  fs = require('fs'),
  zmq = require('zmq');

if (cluster.isMaster) {
  
  // master process - create ROUTER and DEALER sockets, bind endpoints
  let
    router = zmq.socket('router').bind('tcp://*:5433'), // <label id="code.zmq-filer-rep-cluster.router-bind"/>
    dealer = zmq.socket('dealer').bind('ipc://filer-dealer.ipc'); // <label id="code.zmq-filer-rep-cluster.dealer-bind"/>
  
  // forward messages between router and dealer
  router.on('message', function() {
    let frames = Array.apply(null, arguments);
    dealer.send(frames);
  });
  dealer.on('message', function() {
    let frames = Array.apply(null, arguments);
    router.send(frames);
  });
  
  // fork three worker processes
  for (let i = 0; i < 3; i++) {
    cluster.fork();
  }
  
  // listen for workers to come online
  cluster.on('online', function(worker) {
    console.log('Worker ' + worker.process.pid + ' is online.');
  });
  
} else {
  
  // worker process - create REP socket, connect to DEALER
  let responder = zmq.socket('rep').connect("ipc://filer-dealer.ipc");
  
  responder.on('message', function(data) {
    
    // parse incoming message
    let request = JSON.parse(data);
    console.log(process.pid + " received request for: " + request.path);
    
    // read file and reply with content
    fs.readFile(request.path, function(err, data) {
      console.log(process.pid + " sending response");
      responder.send(JSON.stringify({
        pid: process.pid,
        data: data.toString(),
        timestamp: +new Date()
      }));
    });
    
  });
  
}

