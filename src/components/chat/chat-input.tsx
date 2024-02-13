import React, { useContext } from "react";
import { ChevronUpCircle } from "lucide-react";
import { Button } from "../ui/button";
import TextareaAutosize from "react-textarea-autosize";
import { ChatContext } from "./chat-context";

interface ChatInputProps {
  isDisabled?: boolean;
}
const ChatInput: React.FC<ChatInputProps> = ({ isDisabled }) => {
  const { message, handleMessage, isLoading, addMessage } =
    useContext(ChatContext);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() !== "") {
      console.log(message);
      addMessage();
    }
  };

  const handleTextArea = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    handleMessage(value);
  };

  return (
    <div className="p-4 bg-gradient-to-t from-zinc-100 to-zinc-50 ">
      <form
        onSubmit={onSubmit}
        className="flex items-center justify-between bg-white shadow-md rounded-lg px-2 py-2"
      >
        <TextareaAutosize
          //value={message}
          onChange={handleTextArea}
          minRows={1}
          maxRows={5}
          placeholder="Type your message..."
          className="flex-1 ml-3 focus:outline-none text-sm"
          style={{
            resize: "none",
          }}
        />
        <Button
          type="submit"
          variant="ghost"
          disabled={isLoading || isDisabled}
          className="px-3"
        >
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
