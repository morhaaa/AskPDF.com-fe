import { Loader2 } from "lucide-react";
import React from "react";
import ChatInput from "./chat-input";

const Loading = () => {
  return (
    <div className="relative flex-1 bg-zinc-50 flex flex-col justify-between">
      <div className="flex-1 flex flex-col justify-center items-center gap-y-1 mb-10">
        <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
        <h3 className="text-xl font-bold text-zinc-800">Loading...</h3>
        <p className="text-sm font-medium text-zinc-500">
          We&apos;re preparing your pdf
        </p>
      </div>

      <ChatInput disabled={true} />
    </div>
  );
};

export default Loading;
