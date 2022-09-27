import Message from "../message/Message";
import Adapter from "./Adapter";
export default class InMemoryAdapter implements Adapter {
  readonly messages = [];
  save(message: Message): Promise<boolean> {
    this.messages.push(message);
    return Promise.resolve(true);
  }
  poll(): Promise<Message | null> {
    return Promise.resolve(this.messages.shift());
  }
}
