var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://127.0.0.1')

client.on('connect',function () {
    client.subscribe('topic')
    client.publish('topic','hello')
})
