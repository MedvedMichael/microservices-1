import { Kafka } from "kafkajs";
import fetch from "node-fetch";

const setTimeoutPromise = (time) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(), time);
  });
const tryFetch = async (path) => {
  try {
    const result = await fetch(path).then((data) => data.text());
    return JSON.parse(result.split('=>').join(':'));
  } catch (error) {
    console.log(error);
    return await setTimeoutPromise(1000).then(() => tryFetch(path));
  }
};
(async () => {
  const env = await tryFetch("http://webapp:8080");
  const clientId = "service1";
  const brokers = [env.broker];
  const topic = env.topic;

  const kafka = new Kafka({ clientId, brokers });

  const consumer = kafka.consumer({ groupId: clientId });

  const consume = async () => {
    await consumer.connect();
    await consumer.subscribe({ topic });
    await consumer.run({
      eachMessage: ({ message }) => {
        console.log(`received message: ${message.value}`);
      },
    });
  };

  consume();
})();
