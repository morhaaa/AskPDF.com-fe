"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "./ui/button";
import UserDropdown from "./user-dropdown";
import useAuth from "@/hooks/userAuth";

const PrivateNavbar = () => {
  const { userInfo, isLoading } = useAuth();

  return (
    <nav className="sticky border-b shadow-sm h-14 px-6 w-full inset-x-0 z-50 flex justify-between items-center bg-white/75 backdrop:blur-lg transition-all">
      <Link href={"/"} className="font-bold font-sans text-blue-800">
        AskPDF
      </Link>

      {!isLoading && userInfo && <UserDropdown userInfo={userInfo} />}
    </nav>
  );
};

export default PrivateNavbar;
