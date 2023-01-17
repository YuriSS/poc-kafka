const { Kafka } = require("kafkajs")

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["kafka:9092"]
});

const producer = kafka.producer();

const start = async() => {
  await producer.connect();

  setInterval(async () => {
    await producer.send({
      topic: "quickstart-events",
      messages: [
        { value: `Hey man ${Date.now()}` }
      ]
    });
  }, 5000);
}

process.on('beforeExit', async (code) => {
  console.log(`Process is going to exit ${code}`);
  //await producer.disconnect();
});

start();
