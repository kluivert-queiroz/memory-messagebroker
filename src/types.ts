import Message from "./message/Message";

export type QueueListener = (
  message: Message
) => void;
