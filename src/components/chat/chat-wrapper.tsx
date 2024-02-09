"use client";

import React, { useState } from "react";
import Messages from "./messages";
import ChatInput from "./chat-input";
import Loading from "./loading";
import Error from "./error";

interface ChatWrapperProps {
  file_id: string;
}

const ChatWrapper: React.FC<ChatWrapperProps> = ({ file_id }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  if (isLoading) return <Loading />;

  if (error)
    return (
      <Error
        message="Too many pages"
        subMessage="Your free plan doesnt support up to 5 pages per PDF"
      />
    );

  return (
    <div className="relative flex-1 bg-zinc-50 flex flex-col divide-y divide-zinc-500 justify-between">
      <div className="flex-1 flex flex-col justify-between mb-28">
        <Messages />
      </div>
      <ChatInput />
    </div>
  );
};

export default ChatWrapper;
