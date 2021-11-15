import { Kafka } from "kafkajs";
import fetch from "node-fetch";
const setTimeoutPromise = (time) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(), time);
  });
const tryFetch = async (path) => {
  try {
    const result = await fetch(path).then((data) => data.text());
    return JSON.parse(result.split("=>").join(":"));
  } catch (error) {
    console.log(error);
    return await setTimeoutPromise(1000).then(() => tryFetch(path));
  }
};
(async () => {
  const env = await tryFetch("http://webapp:8080");

  const clientId = "root-service";
  const brokers = [env.broker];
  const topic = env.topic;

  const kafka = new Kafka({ clientId, brokers });
  const producer = kafka.producer();

  const produce = async () => {
    await producer.connect();
    let i = 0;

    setInterval(async () => {
      try {
        
        await producer.send({
          topic,
          messages: [
            {
              key: String(i),
              value: "this is message " + i,
            },
          ],
        });

        console.log("writes: ", i);
        i++;
      } catch (err) {
        console.error("could not write message " + err);
      }
    }, 1000);
  };

  
  produce();

})();
