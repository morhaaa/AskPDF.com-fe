'use client'
import toastError from '@/utils/toast-error';
import React from 'react'
import { Page, Document } from 'react-pdf';

const PdfRender = () => {
  return (
    <section className="flex-1 flex flex-col w-full border px-5 md:px-10 lg:px-20 xl:px-28 bg-slate-100 overflow-auto">
      ciao
      <div className='bg-red-200 h-40 w-40'>
        <Document 
          file={''} 
          loading={<div></div>} 
         onLoadError={()=>{toastError('Error loading PDF, Please try again')}}
          className='max h-full'>
          <Page pageNumber={1}/> 
         </Document> 
      </div>
    </section>
  )
}

export default PdfRender
