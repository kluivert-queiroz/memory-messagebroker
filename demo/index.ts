import Message from "../src/message/Message";
import Queue from "../src/queue/Queue";

const queue = new Queue("topic").addListener(
  (message: Message) => console.log("Incoming message", message)
);

queue.publish(new Message("test"));
