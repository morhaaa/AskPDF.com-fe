'use client'
import FilePreview from "./file-preview";
import { UploadCloud } from "lucide-react";
import UploadButton from "./upload-button";
import SkeletonsPreview from "./skeletons-preview";
import { useEffect, useState } from "react";
import { deletePDF, getAllPDF } from "@/api/pdf";
import toast from "react-hot-toast";
import toastError from "@/utils/toast-error";


function Dashboard() {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [pdfList, setPdfList] = useState<PDF[]>([]);
    const [isOpen, setIsOpen] = useState<boolean>(false)
       
    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const pdfListData = await getAllPDF();
                setPdfList(pdfListData);
            } catch (error) {
                console.error('Error fetching PDF list:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [isOpen]);

    const deleteFile = async (id: string) => {
        try {
            const res = await deletePDF(id!);
      
            if (res && res.success) {
              toast.success('Pdf deleted successfully');
              setPdfList((prevPdfList) => prevPdfList.filter((pdf) => pdf._id !== id));
            } else {
              toastError('Something went wrong');
            }
          } catch (error) {
            console.error('Error:', error);
          }
      };

      const triggerButton = () => {
        setIsOpen(!isOpen)
        }

    return (
        <section className="flex-1 flex flex-col w-full border px-5 md:px-10 lg:px-28 bg-slate-100 overflow-auto">
            <div className="flex items-center justify-between py-8 border-b">
                <h1 className="font-bold text-5xl">My Files</h1>
                <UploadButton triggerButton={triggerButton}/>
            </div>

            <div className="flex-1">
            {isLoading ? (
                    <SkeletonsPreview />
                ) : pdfList.length > 0 ? (
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 grid-flow-row py-6">
                        { pdfList.sort().map((pdf, index) => (
                            <FilePreview 
                                  key={index}
                                  pdf={pdf} 
                                  deleteFile={deleteFile}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center gap-2 mt-16">
                        <UploadCloud size={45} />
                        <h3 className="font-semibold text-xl">No file uploaded</h3>
                        <p>Click here to upload a file</p>
                    </div>
                )}
            </div>
        </section>
    );
}

export default Dashboard;
