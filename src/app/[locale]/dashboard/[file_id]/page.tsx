"use client";
import { getPDF } from "@/api/pdf";
import PdfRender from "@/components/pdf-render";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ChatWrapper from "@/components/chat/chat-wrapper";
import DashboardNavbar from "@/components/dashboard-navbar";

const Page = () => {
  const [pdfFile, setPdfFile] = useState<PDF | null>(null);

  const params = useParams<{ file_id: string }>();
  const { file_id } = params;

  useEffect(() => {
    const getPdfData = async () => {
      const pdfResponse = await getPDF(file_id);
      setPdfFile(pdfResponse);
    };
    getPdfData();
  }, [file_id]);

  return (
    <main className="flex flex-col min-h-screen w-screen bg-gradient-to-br from-white via-zinc-100 to-white">
      <DashboardNavbar />
      <div className="flex-1 pt-5 px-2 md:px-6 lg:px-10 ">
        <div className="flex flex-col md:flex-row justify-between border  border-zinc-200 rounded-t-xl shadow-xl overflow-none bg-white">
          <div className="flex-1 h-[86vh] overflow-auto">
            <PdfRender url={pdfFile?.url} />
          </div>
          <div className="md:flex-[0.75] h-[86vh] flex md:border-l">
            <ChatWrapper file_id={file_id} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;
