import React, { MouseEventHandler, useState } from "react";
import { ChevronUpCircle, Send, SendHorizonal } from "lucide-react";
import { Button } from "../ui/button";

interface ChatInputProps {
  disabled?: boolean;
}
const ChatInput: React.FC<ChatInputProps> = ({ disabled }) => {
  const [message, setMessage] = useState<string>("");

  const onSubmit = (message: string) => {};
  const handleMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() !== "") {
      onSubmit(message);
      setMessage("");
    }
  };

  return (
    <div className="p-4 bg-gradient-to-t from-zinc-100 to-zinc-50 ">
      <form
        onSubmit={handleMessageSubmit}
        className="flex items-center justify-between bg-white shadow-md rounded-lg px-2 py-2"
      >
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 ml-3 focus:outline-none text-sm"
        />
        <Button type="submit" variant="ghost" disabled className="px-3">
          <ChevronUpCircle
            strokeWidth={"2.5px"}
            className="h-4 w-4 text-slate-700"
          />
        </Button>
      </form>
    </div>
  );
};

export default ChatInput;
