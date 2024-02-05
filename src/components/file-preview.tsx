'use client';
import React, { useState } from 'react';
import { File, MessageCircle, Trash } from 'lucide-react';
import moment from 'moment';
import prettyBytes from 'pretty-bytes';
import useWindowWidth from '@/hooks/useWidth';
import { truncateString } from '@/utils/truncate-string';

type Props = {
  pdf: PDF;
  deleteFile: (file_id: string) => void;
};

const FilePreview: React.FC<Props> = ({ pdf, deleteFile }) => {

  const [isHover, setIsHover] = useState<boolean>(false);

  //Truncate pdf name by size of the screen
  const windowWidth = useWindowWidth()
  const truncateName = (name: string): string => {
    let maxLength;

    if (windowWidth <= 480) {
      maxLength = 23;
    } else if (windowWidth <= 768) {
      maxLength = 40;
    } else if (windowWidth <= 1024) {
      maxLength = 25;
    } else if (windowWidth <= 1280) {
      maxLength = 30;
    } else if (windowWidth <= 1400) {
      maxLength = 35;
    } else {
      maxLength = 50;
    }

    return truncateString(name, maxLength);
  };

  //Format last modify of pdf
  const formattedDate = moment(pdf.updateAt).format('DD-MM-YYYY HH:mm');


  return (
    <div
      onMouseLeave={() => setIsHover(false)}
      onMouseEnter={() => setIsHover(true)}
      className='rounded-lg shadow-lg flex flex-col relative bg-white overflow-hidden'>
      {isHover && (
        <div 
          onClick={()=>deleteFile(pdf._id!)} 
          className='absolute right-2 top-2 cursor-pointer bg-red-100 p-1 rounded-full'>
          <Trash size={14} strokeWidth='3px' className='text-red-400' />
        </div>
      )}

      <div className='border-b py-3 lg:py-4 flex items-center gap-x-3 lg:gap-x-4 px-5'>
        <div className='p-2 lg:p-3 bg-gray-50 shadow-md border rounded-full'>
          <File className='h-7 w-7 lg:h-8 lg:w-8 text-neutral-700' />
        </div>
        <div className='flex-1 font-sans'>
          <h5 className='font-bold text-neutral-900 overflow-hidden whitespace-nowrap'>
          {truncateName(pdf.name)}
          </h5>
          <p className='italic text-xs lg:text-sm text-gray-500'>{formattedDate}</p>
          <p className='italic text-xs lg:text-sm text-gray-500'>{prettyBytes(pdf.size)}</p>
        </div>
      </div>

      <div className='flex items-center justify-center gap-x-2 text-neutral-500 group cursor-pointer py-2 hover:bg-blue-50'>
        <MessageCircle className='group-hover:text-blue-500 transition-colors duration-300' />
        <p className='font-semibold group-hover:text-blue-500 transition-colors duration-300'>
          Start a new conversation
        </p>
      </div>
    </div>
  );
};

export default FilePreview;
