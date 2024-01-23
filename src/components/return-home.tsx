import React from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

function ReturnToHomePage() {
  return (
    <div className="flex items-center gap-2">
      <Link
        href="/"
        className="bg-gray-300/60 rounded-full h-10 w-10 border drop-shadow-2xl flex items-center justify-center cursor-pointer hover:scale-105"
      >
        <ArrowLeft strokeWidth={2.4} />
      </Link>
      <span>AskPDF</span>
    </div>
  );
}

export default ReturnToHomePage;
