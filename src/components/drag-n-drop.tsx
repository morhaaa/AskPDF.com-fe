import React, { useState } from 'react';
import { Cloud, File, Trash } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { Progress } from './ui/progress';
import { Button } from './ui/button';
import clsx from 'clsx';
import toastError from '@/utils/toast-error';
import { deletePDF, postPDF } from '@/api/pdf';
import { useSelector } from 'react-redux';
import { StoreType} from '@/containers/store';

const DND = () => {
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadingProgress, setUploadingProgress] = useState<number>(0);
  const [uploadedPdf, setUploadedPdf] = useState<PDF | null>(null);
  const [pdfToUpload, setPdfToUpload] = useState<File | null>(null);

  //Redux
  const user_id = useSelector((store: StoreType)=> store.user.data?.accessToken) as string

  const getProgress = (progress: number): void => {
    setUploadingProgress(progress)
    if(progress === 100) {
      setIsUploading(false)
    }
  };

  const sizeValidator = (file: File) => {
    if (file.size > 4 * 1024 * 1024) {
      toastError('Il file deve essere inferiore a 4MB.');
      return {
        code: 'size-too-large',
        message: 'Size is larger than 4MB',
      };
    }

    return null;
  };

  const uploadFileToDB = async(file: File) => {
    const res = await postPDF(file, user_id, getProgress)
    if (res.success) {
      setUploadedPdf(res.file as PDF)
    }
   }

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'application/pdf': [],
    },
    validator: sizeValidator,
    maxFiles: 1,
    onDrop:async (files) => {
      setIsUploading(true);
      const file = files[files.length - 1];
      setPdfToUpload(file);      
      await uploadFileToDB(file)
    },
  });

 

  const removeFile = async () => {
    try {
      if (uploadedPdf && uploadedPdf._id) {
        const res = await deletePDF(uploadedPdf._id);
        
       if(res && res.success){
        setPdfToUpload(null); 
        setUploadingProgress(0);
       }

      }
    } catch (error) {
      console.error('Error:', error)
    }
  };
  



  return (
    <section className="">
      {pdfToUpload ? (
        <div className="space-y-6 pt-4">
          <div className="px-4 py-2 border border-neutral-200 bg-gray-200/50 shadow-md rounded-md w-full flex flex-col items-center justify-between gap-x-2">
            <div className="flex items-center w-full gap-x-2">
              <div className="p-2 bg-gray-50 shadow-md border rounded-full">
                <File className="h-7 w-7 text-neutral-700" />
              </div>
              <div className="flex flex-col w-full flex-1">
                <p className="font-semibold text-neutral-700">
                  {pdfToUpload.name || 'File.pdf'}
                </p>
                {isUploading ? (
                  <Progress value={uploadingProgress} className="mt-1" />
                ) : (
                  <p>File Info</p>
                )}
              </div>
              <button disabled={isUploading} onClick={removeFile}>
                <Trash
                  size={20}
                  className={clsx(
                    'text-red-400 cursor-pointer',
                    isUploading ? 'opacity-0' : 'opacity-1'
                  )}
                />
              </button>
            </div>
          </div>
          <Button
            size={'sm'}
            className="w-full bg-blue-500 hover:bg-blue-400 shadow-md"
            disabled={isUploading}
            onClick={()=>{}}
          >
            Start new conversation
          </Button>
        </div>
      ) : (
        <div
          {...getRootProps({
            className:
              'dropzone flex flex-col items-center justify-center w-full h-full bg-gray-100/80 border-dashed border-2 h-60 border-gray-300 rounded-md px-6',
          })}
        >
          <input {...getInputProps()} />
          <Cloud size={48} className="text-gray-500 mb-2" />
          <p className="mb-1 font-semibold">
            Click to upload or drag and drop
          </p>
          <p className="text-sm">PDF (up to 4MB)</p>
        </div>
      )}
    </section>
  );
};

export default DND;
