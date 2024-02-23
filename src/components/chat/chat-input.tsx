import React, { useContext, useRef } from "react";
import { ChevronUpCircle } from "lucide-react";
import { Button } from "../ui/button";
import TextareaAutosize from "react-textarea-autosize";
import { ChatContext } from "./chat-context";
import clsx from "clsx";

interface ChatInputProps {
  isDisabled?: boolean;
}
const ChatInput: React.FC<ChatInputProps> = ({ isDisabled }) => {
  const {
    inputMessage,
    handleInputMessage,
    isLoading,
    addMessage,
    isThinking,
    isWriting,
  } = useContext(ChatContext);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim() !== "") {
      addMessage();
    }
  };

  const handleTextArea = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    handleInputMessage(value);
  };

  return (
    <div className="p-4 pt-1 bg-gradient-to-t from-zinc-100 to-zinc-50  backdrop-blur-sm">
      <form
        onSubmit={onSubmit}
        className="flex items-center justify-between bg-white shadow-md rounded-lg px-2 py-2"
      >
        <TextareaAutosize
          value={inputMessage}
          onChange={handleTextArea}
          ref={textareaRef}
          minRows={1}
          maxRows={5}
          placeholder={isDisabled ? "" : "Type your message..."}
          className={clsx(
            "flex-1 ml-3 focus:outline-none text-sm",
            isDisabled && "outline-none"
          )}
          onKeyDown={(e) => {
            if (
              e.key === "Enter" &&
              !e.shiftKey &&
              !isLoading &&
              !isDisabled &&
              !isThinking &&
              !isWriting &&
              inputMessage.length > 0
            ) {
              onSubmit(e);
              textareaRef.current?.focus();
            }
          }}
          style={{
            resize: "none",
          }}
        />
        <Button
          type="submit"
          variant="ghost"
          disabled={
            isWriting ||
            isLoading ||
            isDisabled ||
            isThinking ||
            inputMessage.length < 1
          }
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
