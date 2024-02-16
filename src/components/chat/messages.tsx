import clsx from "clsx";
import { FileText } from "lucide-react";
import React from "react";

interface MessagesProps {
  messages: IMessage[];
}

const Messages: React.FC<MessagesProps> = ({ messages }) => {
  return (
    <div className="h-full flex flex-col gap-2 px-4 py-2 overflow-auto  bg-zinc-50">
      {messages.map((message, index) => (
        <div
          key={index}
          className={clsx(
            `flex items-end gap-2 drop-shadow-sm  mb-2`,
            message.isUserMessage && "flex-row-reverse"
          )}
        >
          <div
            className={clsx(
              "h-6 w-6 flex justify-center items-center text-white rounded-full",
              message.isUserMessage ? "bg-violet-500" : "bg-black"
            )}
          >
            {message.isUserMessage ? (
              <span className="font-semibold">U</span>
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
      ))}
    </div>
  );
};

export default Messages;
