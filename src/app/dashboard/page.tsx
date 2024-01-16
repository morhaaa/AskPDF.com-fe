'use client'
import React from "react";
import SideMenu from "@/components/side-menu";

function Dashboard() {


  return <main className="h-screen w-screen flex">
    <nav className='basis-1/5 h-full'>
      <SideMenu/>
    </nav>
    <div className="flex-1 h-full">

    </div>
  </main>;
}

export default Dashboard;
