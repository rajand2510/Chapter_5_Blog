import React from 'react'
import { User } from 'lucide-react'
const Comment = () => {
  return (
   <div className='m-4  flex flex-col  '>
  <div className='border mt-5 flex flex-col gap-2 border-gray-200 rounded-xl h-auto p-2 mx-2'>
                    <div className='flex flex-row gap-2 '>
                        <div className='bg-gray-200 p-2 w-9 rounded-full'><User size={20} className='  ' /></div>
                        <div className='flex flex-col text-xs m-1'>
                            <h4>
                                John Doe
                            </h4>
                        </div>
                    </div>
                    <div className='m-2 flex flex-row justify-between gap-2'>
                        
                       <input type="text" placeholder='share your thoughts' className='w-[80%] text-xs h-8 focus:outline-none p-2 bg-gray-100 rounded-lg'/>
                        <button className='text-xs bg-gray-400 text-white font-semibold px-2 rounded-lg'>Comment</button>
                    </div>

                </div>
                <div className='border mt-5 flex flex-col gap-2 border-gray-200 rounded-xl h-auto p-2 mx-2'>
                    <div className='flex flex-row gap-2 '>
                        <div className='bg-gray-200 p-2 w-9 rounded-full'><User size={20} className='  ' /></div>
                        <div className='flex flex-col text-xs m-1'>
                            <h4>
                                John Doe
                            </h4>
                            <p className=' text-[9px] text-gray-500'>20 jan 2025</p>
                        </div>
                    </div>
                    <div className='m-2'>
                        
                        <p className='text-sm text-gray-500'>
                            The web development landscape is constantly evolving, and 2025 promises to bring exciting new trends that will reshape how we build
                        </p>
                        
                    </div>

                </div>
            </div>
  )
}

export default Comment