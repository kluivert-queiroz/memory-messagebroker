import Adapter from "../adapters/Adapter";
import InMemoryAdapter from "../adapters/InMemoryAdapter";
import Message from "../message/Message";
import { QueueListener } from "../types";

class Queue {
  readonly name: string;
  private listeners: QueueListener[] = [];
  private adapter: Adapter;
  constructor(name: string, adapter?: Adapter) {
    this.name = name;
    this.adapter = adapter || new InMemoryAdapter();
  }
  addListener(listener: QueueListener) {
    this.listeners.push(listener);
    return this;
  }
  removeListener(listener: QueueListener) {
    this.listeners.filter((currListener) => currListener !== listener);
    return this;
  }
  async publish(message: Message) {
    this.adapter.save(message);
    this.consume();
  }
  async consume() {
    const listeners = this.getListeners();
    let currentMessage = await this.adapter.poll();
    while (currentMessage) {
      await Promise.all(listeners.map((listener) => listener(currentMessage)));
      currentMessage = await this.adapter.poll();
    }
  }
  getListeners(): QueueListener[] {
    return [...this.listeners];
  }
}

export default Queue;
