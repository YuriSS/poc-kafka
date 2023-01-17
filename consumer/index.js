const { Kafka } = require("kafkajs")

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["kafka:9092"]
});

const consumer = kafka.consumer({ groupId: 'test-group' })

const start = async() => {
  await consumer.connect();

  await consumer.subscribe({ topic: "quickstart-events", fromBeginning: true })

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        value: message.value.toString(),
      })
    },
  });
}

process.on('beforeExit', async (code) => {
  console.log(`Process is going to exit ${code}`);
  await consumer.disconnect();
});

start();
