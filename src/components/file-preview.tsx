'use client';
import React, { useState } from 'react';
import { File, MessageCircle, Trash } from 'lucide-react';

const FilePreview: React.FC = () => {
  const [isHover, setIsHover] = useState<boolean>(false);

  return (
    <div
      onMouseLeave={() => setIsHover(false)}
      onMouseEnter={() => setIsHover(true)}
      className='rounded-lg shadow-lg flex flex-col relative bg-white'>
      {isHover && (
        <div className='absolute right-2 top-2 cursor-pointer bg-red-100 p-1 rounded-full'>
          <Trash size={14} strokeWidth='3px' className='text-red-400' />
        </div>
      )}

      <div className='border-b py-5 flex items-center gap-x-3 px-4'>
        <div className='p-2 bg-gray-50 shadow-md border rounded-full'>
          <File className='h-7 w-7 text-neutral-600' />
        </div>
        <div className='flex-1 font-sans'>
          <h5 className='text-lg font-semibold text-neutral-900'>File Name</h5>
          <p className='italic text-sm text-gray-500'>File Info</p>
        </div>
      </div>

      <div className='flex items-center justify-center gap-x-2 text-neutral-500 group cursor-pointer py-3 hover:bg-blue-50'>
        <MessageCircle className='group-hover:text-blue-500 transition-colors duration-300' />
        <p className='font-semibold group-hover:text-blue-500 transition-colors duration-300'>
          Start a new conversation
        </p>
      </div>
    </div>
  );
};

export default FilePreview;
