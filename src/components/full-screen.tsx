import React, { useRef, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Expand, Loader2 } from "lucide-react";
import SimpleBar from "simplebar-react";
import { Page, Document, pdfjs } from "react-pdf";
import useWindowWidth from "@/hooks/useWidth";
import toastError from "@/utils/toast-error";

interface FullScreenProps {
  fileUrl: string | undefined;
}

const FullScreen: React.FC<FullScreenProps> = ({ fileUrl }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [numPages, setNumPages] = useState<number>(0); // Total pdf pages

  const documentRef = useRef(null);
  const documentWidth = useWindowWidth(documentRef);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(visible) => {
        if (!visible) {
          setIsOpen(visible);
        }
      }}
    >
      <Button
        onClick={() => setIsOpen(true)}
        variant={"ghost"}
        className="ml-2"
      >
        <Expand className="h-4 w-4" />
      </Button>
      <DialogContent
        close={() => {
          setIsOpen(false);
        }}
        className="max-w-7xl w-full"
      >
        <SimpleBar autoHide={false} className="h-[calc(100vh-6rem)] mt-6">
          <div ref={documentRef}>
            <Document
              file={fileUrl}
              loading={
                <div className="flex justify-center items-center ">
                  <Loader2 className="my-40 h-6 w-6 animate-spin" />
                </div>
              }
              onLoadSuccess={({ numPages }) => {
                setNumPages(numPages);
              }}
              onLoadError={() => {
                toastError("Error loading PDF, Please try again");
              }}
              className="max-h-full"
            >
              {new Array(numPages).fill(0).map((_, i) => (
                <Page
                  key={i}
                  width={documentWidth ? documentWidth : 1}
                  pageNumber={i + 1}
                />
              ))}
            </Document>
          </div>
        </SimpleBar>
      </DialogContent>
    </Dialog>
  );
};

export default FullScreen;
