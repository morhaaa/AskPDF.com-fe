import Dashboard from "@/components/dashboard";
import Navbar from "@/components/navbar";
import React from "react";

function Page() {
  return (
    <main className="flex flex-col items-center justify-center h-screen w-screen">
      <Navbar/>
      <Dashboard/>
    </main>
  );
}

export default Page;
