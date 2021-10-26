//const http = require("http");
const { Kafka } = require("kafkajs")

// the client ID lets kafka know who's producing the messages
const clientId = "root-service"
// we can define the list of brokers in the cluster
const brokers = ["kafka:9092"]
// this is the topic to which we want to write messages
const topic = "message-log"

const kafka = new Kafka({ clientId, brokers })
const producer = kafka.producer()

const produce = async () => {
	await producer.connect()
	let i = 0

	// after the produce has connected, we start an interval timer
	setInterval(async () => {
		try {
			// send a message to the configured topic with
			// the key and value formed from the current value of `i`
			await producer.send({
				topic,
				messages: [
					{
						key: String(i),
						value: "this is message " + i,
					},
				],
			})

			// if the message is written successfully, log it and increment `i`
			console.log("writes: ", i)
			i++
		} catch (err) {
			console.error("could not write message " + err)
		}
	}, 1000)
}

// const server = http.createServer((req, res) => {
//   if (req.url === "/api/service1") {
//     res.writeHead(200);
//     res.write("Hello from service1");
//   } else {
//     res.writeHead(404);
//   }
//   res.end();
// });

produce();

// server.listen(8080);
