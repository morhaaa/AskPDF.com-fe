'use client'
import FilePreview from "./file-preview";
import { UploadCloud } from "lucide-react";
import UploadButton from "./upload-button";
import SkeletonsPreview from "./skeletons-preview";
import { useEffect, useState } from "react";

const files = ['','','',''];
function Dashboard() {
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const timerId = setTimeout(() => {
            setIsLoading(false);
        }, 1000);
        return () => clearTimeout(timerId);
    }, []);

    return (
        <section className="flex-1 flex flex-col w-full border px-5 md:px-10 lg:px-28 bg-slate-100 overflow-scroll">
            <div className="flex items-center justify-between py-8 border-b">
                <h1 className="font-bold text-5xl">My Files</h1>
                <UploadButton />
            </div>

            <div className="flex-1">
                {isLoading ? (
                    <SkeletonsPreview />
                ) : files.length > 0 ? (
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 grid-flow-row py-6">
                        {files.sort().map((_, index) => (
                            <FilePreview key={index} />
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
