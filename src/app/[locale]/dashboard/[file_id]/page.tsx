
import Navbar from '@/components/navbar'
import PdfRender from '@/components/pdf-render'
import React from 'react'

const Page = () => {
  return (
    <main className="flex flex-col items-center justify-center h-screen w-screen">
    <Navbar/>
    <PdfRender/>
  </main>
  )
}

export default Page
