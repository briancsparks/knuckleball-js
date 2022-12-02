

// subscriber.js
const mqtt = require('mqtt')

// const client = mqtt.connect(process.env.MQTT_BROKER_URL)
const client = mqtt.connect('tcp://localhost:1883')
const topicName = 'test/connection'


// connect to same client and subscribe to same topic name
client.on('connect', () => {
    // can also accept objects in the form {'topic': qos}
  client.subscribe(topicName, (err, granted) => {
      if(err) {
          console.log(err, 'err');
      }
      console.log(granted, 'granted')
  })
})


// on receive message event, log the message to the console
client.on('message', (topic, message, packet) => {
  console.log(packet, packet.payload.toString());
  if(topic === topicName) {
   console.log(JSON.parse(message));
  }
})


client.on("packetsend", (packet) => {
    console.log(packet, 'packet2');
})
