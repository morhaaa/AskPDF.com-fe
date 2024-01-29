import React, { useState } from 'react';
import { Cloud, File, Trash } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { Progress } from './ui/progress';
import { Button } from './ui/button';
import clsx from 'clsx';
import toastError from '@/utils/toast-error';

const DND = () => {
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadingProgress, setUploadingProgress] = useState<number>(0);
  const [updatedFile, setUpdatedFile] = useState<File | null>(null);

  const startProgress = (): void => {
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 1;
      setUploadingProgress(currentProgress);

      if (currentProgress === 100) {
        clearInterval(interval);
        setIsUploading(false);
      }
    }, 2000 / 100);
  };

  const sizeValidator = (file: File) => {
    if (file.size > 4 * 1024 * 1024) {
      toastError('Il file deve essere inferiore a 4MB.');
      return {
        code: 'size-too-large',
        message: 'Size is larger than 4MB characters',
      };
    }

    return null;
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'application/pdf': [],
    },
    validator: sizeValidator,
    maxFiles: 1,
    onDrop: (files) => {
      setFile(files);
      setIsUploading(true);
      startProgress();
    },
  });

  const setFile = (files: File[]): void => {
    const file = files[files.length - 1];
    setUpdatedFile(file);
  };

  const removeFile = (): void => {
    setUpdatedFile(null);
    setUploadingProgress(0);
  };

  return (
    <section className="">
      {updatedFile ? (
        <div className="space-y-6 pt-4">
          <div className="px-4 py-2 border border-neutral-200 bg-gray-200/50 shadow-md rounded-md w-full flex flex-col items-center justify-between gap-x-2">
            <div className="flex items-center w-full gap-x-2">
              <div className="p-2 bg-gray-50 shadow-md border rounded-full">
                <File className="h-7 w-7 text-neutral-700" />
              </div>
              <div className="flex flex-col w-full flex-1">
                <p className="font-semibold text-neutral-700">
                  {updatedFile.name || 'File.pdf'}
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
