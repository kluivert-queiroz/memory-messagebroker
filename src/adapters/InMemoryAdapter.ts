import Message from "../message/Message";
import Adapter from "./Adapter";
export default class InMemoryAdapter implements Adapter {
  readonly messages = [];
  async save(message: Message): Promise<boolean> {
    this.messages.push(message);
    return true;
  }
  async poll(): Promise<Message | null> {
    return this.messages.shift();
  }
}
