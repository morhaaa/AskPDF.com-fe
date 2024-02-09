import { ChevronLeft, XCircle } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

interface ErrorProps {
  message: string;
  subMessage?: string;
}
const Error: React.FC<ErrorProps> = ({ message, subMessage }) => {
  return (
    <div className="relative flex-1 bg-white flex flex-col  justify-between">
      <div className="flex-1 flex flex-col justify-center items-center gap-y-1 mb-10">
        <XCircle className="h-8 w-8 text-red-500" />
        <h3 className="text-xl font-bold text-zinc-800">{message}</h3>
        <p className="text-sm font-medium text-zinc-500">{subMessage}</p>
        <Link href={"/dashboard"} className="mt-4 shadow-sm">
          <Button variant={"secondary"}>
            <ChevronLeft className="h-5 w-5" />
            Back
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Error;
