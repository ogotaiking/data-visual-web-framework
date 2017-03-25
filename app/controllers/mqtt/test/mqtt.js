var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://127.0.0.1')

client.on('connect',function () {
    client.subscribe('#')
    client.publish('topicA','hello')
})

    client.on('message', function (topic, message) {
        // message is Buffer
        console.log(topic.toString(),message.toString());
        //client.end();
    });
