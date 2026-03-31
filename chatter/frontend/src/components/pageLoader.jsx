import React from 'react'
import { LoaderIcon } from 'lucide-react'

const PageLoader = () => {
  return (
    <div className='min-h-screen flex justify-center items-center'>
      <LoaderIcon className='animate-spin size-10 text-primary'></LoaderIcon>
    </div>
  )
}

export default PageLoader
