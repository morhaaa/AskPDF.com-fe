import { streamMessages } from "@/api/chat";
import axios from "axios";
import { ReactNode, createContext, useState } from "react";
interface StreamResponse {
  message: string;
  addMessage: () => void;
  isLoading: boolean;
  handleMessage: (message: string) => void;
}

export const ChatContext = createContext<StreamResponse>({
  message: "",
  addMessage: () => {},
  isLoading: false,
  handleMessage: () => {},
});

interface Props {
  file_id: string;
  children: ReactNode;
}

export const ChatContextProvider = ({ file_id, children }: Props) => {
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const sendMessage = async (file_id: string, message: string) => {
    await streamMessages(file_id, message);
  };

  const addMessage = () => sendMessage(file_id, message);
  const handleMessage = (value: string) => {
    setMessage(value);
  };

  return (
    <ChatContext.Provider
      value={{
        message,
        addMessage,
        isLoading,
        handleMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
