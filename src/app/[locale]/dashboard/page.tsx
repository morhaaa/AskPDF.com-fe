import Dashboard from "@/components/dashboard";
import Navbar from "@/components/navbar";
import React from "react";

function Page() {
  return (
    <main className="flex flex-col items-center justify-center h-screen w-screen bg-gradient-to-br from-white via-zinc-100 to-white">
      <Navbar />
      <Dashboard />
    </main>
  );
}

export default Page;
