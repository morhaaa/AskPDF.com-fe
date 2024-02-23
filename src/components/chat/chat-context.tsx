import { streamMessages } from "@/api/chat";
import { ReactNode, createContext, useEffect, useState } from "react";

interface StreamResponse {
  inputMessage: string;
  messages: IMessage[];
  isLoading: boolean;
  isThinking: boolean;
  isWriting: boolean;
  handleIsThinking: (bool: boolean) => void;
  handleIsWriting: (bool: boolean) => void;
  updateMessages: (msg: IMessage) => void;
  addMessage: () => void;
  loadOldMessages: (oldMessages: IMessage[]) => void;
  handleInputMessage: (message: string) => void;
}

export const ChatContext = createContext<StreamResponse>({
  inputMessage: "",
  messages: [],
  isLoading: false,
  isThinking: false,
  isWriting: false,
  addMessage: () => {},
  handleIsThinking: () => {},
  handleIsWriting: () => {},
  updateMessages: () => {},
  loadOldMessages: () => {},
  handleInputMessage: () => {},
});

interface Props {
  file_id: string;
  messagesList: IMessage[];
  children: ReactNode;
}

export const ChatContextProvider = ({
  file_id,
  messagesList,
  children,
}: Props) => {
  const [messages, setMessages] = useState<IMessage[]>(messagesList);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isThinking, setIsThinking] = useState<boolean>(false);
  const [isWriting, setIsWriting] = useState<boolean>(false);

  const sendMessage = async (file_id: string, message: string) => {
    setIsLoading(true);
    streamMessages(file_id, message);
    setInputMessage("");
    setIsLoading(false);
  };

  const updateMessages = (msg: IMessage) => {
    setMessages((prev) => [...prev, msg]);
  };

  const loadOldMessages = (oldMessages: IMessage[]) => {
    setMessages((prev) => [...oldMessages, ...prev]);
  };

  const addMessage = () => {
    const newMessage = {
      text: inputMessage,
      isUserMessage: true,
      createdAt: new Date(),
      file_id: file_id,
    };
    updateMessages(newMessage);
    setIsThinking(true);
    sendMessage(file_id, inputMessage);
  };

  const handleInputMessage = (value: string) => {
    setInputMessage(value);
  };

  const handleIsThinking = (bool: boolean) => {
    setIsThinking(bool);
  };
  const handleIsWriting = (bool: boolean) => {
    setIsWriting(bool);
  };

  return (
    <ChatContext.Provider
      value={{
        inputMessage,
        messages,
        isLoading,
        isThinking,
        isWriting,
        addMessage,
        handleIsThinking,
        handleIsWriting,
        updateMessages,
        loadOldMessages,
        handleInputMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
