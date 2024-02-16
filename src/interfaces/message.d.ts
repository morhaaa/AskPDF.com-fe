interface IMessage {
  text: string;
  isUserMessage: boolean;
  createdAt: Date;
  user_id: string;
  file_id: string;
}
