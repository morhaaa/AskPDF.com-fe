"use client";
//Hooks
import { useState, useRef } from "react";
import useWindowWidth from "@/hooks/useWidth";
//react-pdf
import { Page, Document, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
//UI Components
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
//SimpleBar
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
//Others
import toastError from "@/utils/toast-error";
import {
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Loader2,
  Search,
} from "lucide-react";
import FullScreen from "./full-screen";
import { cn } from "@/utils/tw-utils";
import Link from "next/link";

interface Props {
  url: string | undefined;
}

const PdfRender: React.FC<Props> = ({ url }) => {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

  const [numPages, setNumPages] = useState<number>(0); //Total pdf pages
  const [currentPage, setCurrentPage] = useState<number>(0); //Current page in view
  const [inputValue, setInputValue] = useState<number | "">(""); // Input value
  const [zoom, setZoom] = useState<number>(1); // Zoom Page
  const [renderedZoom, setRenderedZoom] = useState<number>(0); //Page is rendering a new zoom

  const isLoading = renderedZoom !== zoom;

  const documentRef = useRef(null);
  const documentWidth = useWindowWidth(documentRef);

  const handlePage = (value: number) => {
    let page = 0;
    if (value <= numPages) {
      page = value;
    } else {
      page = numPages;
    }
    setCurrentPage(page);
    setInputValue(page);
  };

  return (
    <section className="flex-1 flex flex-col w-full">
      {/* Navbar PDF */}
      <div className="py-1.5 flex items-center justify-between px-4 border-b shadow-xl h-14">
        {/* left side navbar */}
        <Link
          href="/dashboard"
          className=" rounded-full h-10 w-10 border bg-zinc-50 shadow-2xl flex items-center justify-center cursor-pointer hover:scale-105"
        >
          <ArrowLeft strokeWidth={2.4} className="h-4 w-4" />
        </Link>
        {/* right side navbar */}
        <div className="flex gap-x-1">
          {/* change pdf page */}
          <div className="flex gap-x-1.5 px-2 lg:px-3">
            <div>
              <Button
                variant="ghost"
                className="w-8 p-0"
                disabled={currentPage <= 1}
                onClick={() => {
                  setCurrentPage((prev) => {
                    const newValue = prev - 1 > 1 ? prev - 1 : 1;
                    setInputValue(newValue);
                    return newValue;
                  });
                }}
              >
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center gap-x-2">
              <Input
                type="number"
                placeholder="0"
                className="w-12 h-8"
                value={inputValue}
                onChange={(e) => setInputValue(parseInt(e.target.value, 10))}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    const inputValue = parseInt(e.currentTarget.value, 10);
                    handlePage(inputValue);
                  }
                }}
              />
              <p className="text-zinc-700 text-sm space-x-1">
                <span>/</span>
                <span>{numPages}</span>
              </p>
            </div>
            <Button
              variant="ghost"
              className="w-8 p-0"
              disabled={numPages === 0}
              onClick={() => {
                setCurrentPage((prev) => {
                  const newValue = prev + 1 > numPages ? numPages : prev + 1;
                  setInputValue(newValue);
                  return newValue;
                });
              }}
            >
              <ChevronUp className="h-4 w-4" />
            </Button>
          </div>
          {/* scale pdf */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="border-x rounded-none">
              <Button variant="ghost">
                <Search className="h-4 w-4" />
                <span>{zoom * 100}%</span>
                <ChevronDown className="h-3 w-3 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Scale</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={() => setZoom(0.5)}>
                50%
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setZoom(0.75)}>
                75%
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setZoom(1)}>
                100%
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setZoom(1.5)}>
                150%
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setZoom(2)}>
                200%
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setZoom(2.5)}>
                250%
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {/* Pdf FullScreen*/}
          <FullScreen fileUrl={url} />
        </div>
      </div>

      {/* Document */}
      <div className="flex-1 w-full">
        <SimpleBar autoHide={false} className="h-[calc(100vh-9.5rem)] bg-white">
          <div ref={documentRef}>
            <Document
              file={url}
              loading={
                <div className="flex justify-center">
                  <Loader2 className="my-40 h-6 w-6 animate-spin" />
                </div>
              }
              onLoadSuccess={({ numPages }) => {
                setNumPages(numPages);
                setCurrentPage(1);
                setInputValue(1);
              }}
              onLoadError={() => {
                toastError("Error loading PDF, Please try again");
              }}
              className="h-full flex items-center justify-center"
            >
              {isLoading && renderedZoom ? (
                <Page
                  pageNumber={currentPage}
                  width={documentWidth ? documentWidth : 1}
                  scale={zoom}
                  key={"@" + renderedZoom}
                />
              ) : null}
              <Page
                pageNumber={currentPage}
                width={documentWidth ? documentWidth : 1}
                scale={zoom}
                className={cn(isLoading ? "hidden" : "")}
                key={"@" + zoom}
                loading={
                  <div className="flex justify-center">
                    <Loader2 className="my-24 h-6 w-6 animate-spin" />
                  </div>
                }
                onRenderSuccess={() => {
                  setRenderedZoom(zoom);
                }}
              />
            </Document>
          </div>
        </SimpleBar>
      </div>
    </section>
  );
};

export default PdfRender;
