"use client";

import React, { useEffect, useState } from "react";
import Messages from "./messages/messages";
import ChatInput from "./chat-input";
import Loading from "./loading";
import Error from "./error";
import { ChatContextProvider } from "./chat-context";
import { getMessages } from "@/api/chat";
interface ChatWrapperProps {
  file_id: string;
}

const ChatWrapper: React.FC<ChatWrapperProps> = ({ file_id }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    setIsLoading(true);
    const loadMessages = async () => {
      try {
        const response = await getMessages(file_id);
        setMessages(response);
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading messages:", error);
        setIsLoading(false);
      }
    };
    loadMessages();
  }, [file_id]);

  if (isLoading) return <Loading />;

  if (error)
    return (
      <Error
        message="Too many pages"
        subMessage="Your free plan doesnt support up to 5 pages per PDF"
      />
    );

  return (
    <ChatContextProvider file_id={file_id} messagesList={messages}>
      <div className="relative flex-1 flex flex-col justify-between overflow-hidden">
        <div className="h-14 border-b border-zinc-200 md:border-t-0 border-t-2 flex items-center justify-end px-4">
          <p className="font-bold"> AskPDF - Chat</p>
        </div>
        <Messages file_id={file_id} />
        <ChatInput />
      </div>
    </ChatContextProvider>
  );
};

export default ChatWrapper;
