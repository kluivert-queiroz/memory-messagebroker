import Message from "../message/Message";

export default interface Adapter {
  save(message: Message): Promise<boolean>;
  poll(): Promise<Message | null>;
}
