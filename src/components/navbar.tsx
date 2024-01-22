"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "./ui/button";

const Navbar: React.FC = () => {
  const router = useRouter();

  return (
    <nav className="sticky h-14 px-10 w-full inset-x-0 z-50 flex justify-between items-center bg-white/75 backdrop:blur-lg transition-all">
      <Link href={"/"} className="">
        AskPDF
      </Link>
      <div className="flex items-center gap-x-3">
        <Button
          variant="ghost"
          onClick={() => {
            router.push("/login");
          }}
        >
          Login
        </Button>
        <Button
          onClick={() => {
            router.push("/sign-up");
          }}
        >
          Sign Up
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
