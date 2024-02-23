import { socket } from "@/socket";
import clsx from "clsx";
import {
  FileText,
  Loader2,
  MessageSquare,
  MessageSquareText,
} from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import { ChatContext } from "../chat-context";
import { getOldMessages } from "@/api/chat";
import MessageSeparator from "./message-separator";
//SimpleBar
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import useAuth from "@/hooks/userAuth";

interface MessagesProps {
  file_id: string;
}

const Messages: React.FC<MessagesProps> = ({ file_id }) => {
  //Context
  const {
    messages,
    isThinking,
    handleIsWriting,
    handleIsThinking,
    updateMessages,
    loadOldMessages,
  } = useContext(ChatContext);

  //states
  const [streamedResponse, setStreamedResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMoreMessages, setHasMoreMessages] = useState<boolean>(false);

  //user info
  const email = useAuth()?.email;

  //socket
  useEffect(() => {
    socket.connect();

    let response = "";

    socket.on("openAIResponseStarted", (chunk: string) => {
      handleIsThinking(false);
      handleIsWriting(true);
      response += chunk;
      setStreamedResponse(response);
    });

    socket.on("openAIResponseComplete", () => {
      const newMessage = {
        text: response,
        isUserMessage: false,
        createdAt: new Date(),
        file_id: file_id,
      };
      updateMessages(newMessage);
      handleIsWriting(false);
      //clear response
      response = "";
      setStreamedResponse(null);
    });

    socket.on("checkPrevMessages", (value: boolean) => {
      setHasMoreMessages(value);
    });

    return () => {
      socket.disconnect();
    };
  }, [file_id]);

  //last Message
  const messagesEndRef = useRef<HTMLDivElement>(null);

  //Scroll to last message
  useEffect(() => {
    if (!isLoading && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, streamedResponse]);

  //Load old messages
  const updateOldMessages = async () => {
    setIsLoading(true);
    const response = await getOldMessages(file_id, messages[0].createdAt);
    loadOldMessages(response);
    setTimeout(() => setIsLoading(false), 50); //Work around
  };

  return (
    <div className="flex-1 flex flex-col gap-2 px-4 py-2 overflow-auto bg-zinc-50">
      {messages.length > 0 ? (
        <>
          {hasMoreMessages &&
            (isLoading ? (
              <div className="flex flex-col items-center justify-center text-zinc-500 my-2">
                <Loader2 className="h-6 w-6 animate-spin" />
                <p className="text-xs">loading...</p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-zinc-500 my-2">
                <button
                  onClick={updateOldMessages}
                  className="text-xs cursor hover:underline"
                >
                  Carica vecchi messaggi
                </button>
              </div>
            ))}
          {messages.map((message, index) => {
            const { createdAt } = message;
            const currentDate = new Date(createdAt);
            const previousDate =
              index > 0 ? new Date(messages[index - 1].createdAt) : null;

            return (
              <div key={index}>
                <MessageSeparator
                  key={`separator-${index}`}
                  currentDate={currentDate}
                  previousDate={previousDate}
                />
                <div
                  className={clsx(
                    `flex items-end gap-2 drop-shadow-sm  mb-2`,
                    message.isUserMessage && "flex-row-reverse"
                  )}
                >
                  <div
                    className={clsx(
                      "h-7 w-7 flex justify-center items-center text-white rounded-full",
                      message.isUserMessage ? "bg-indigo-500" : "bg-black"
                    )}
                  >
                    {message.isUserMessage ? (
                      <span className="text-white font-semibold font-sans text-xs">
                        {email?.charAt(0).toUpperCase()}
                      </span>
                    ) : (
                      <FileText className="h-4 w-4 " />
                    )}
                  </div>
                  <div
                    className={clsx(
                      `flex-1 flex `,
                      message.isUserMessage && "justify-end"
                    )}
                  >
                    <p
                      className={`text-sm xl:max-w-[400px] shadow p-2 rounded-lg border border-slate-100 ${
                        message.isUserMessage
                          ? "rounded-br-none bg-white"
                          : "rounded-bl-none bg-zinc-100 "
                      }`}
                    >
                      {message.text}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
          {(isThinking || streamedResponse) && (
            <div className="flex items-end gap-2 drop-shadow-sm  mb-2">
              <div className="h-6 w-6 flex justify-center items-center text-white rounded-full bg-black">
                <FileText className="h-4 w-4 " />
              </div>
              <div
                className="
                flex-1 flex"
              >
                <div
                  className="text-sm xl:max-w-[400px] shadow p-2 rounded-lg border border-slate-100
                      rounded-bl-none bg-zinc-100 "
                >
                  {streamedResponse ? (
                    streamedResponse
                  ) : (
                    <Loader2 className="h-4 w-4 animate-spin text-zinc-400" />
                  )}
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </>
      ) : (
        <div className="h-full w-full flex flex-col gap-y-1 items-center justify-center  text-zinc-600">
          <MessageSquareText strokeWidth={1.4} className="h-8 w-8" />
          <p className="font-medium"> Start a new conversation with your pdf</p>
        </div>
      )}
    </div>
  );
};

export default Messages;
