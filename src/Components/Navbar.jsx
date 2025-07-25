import React from 'react'
import { PenTool, House, UserRound } from 'lucide-react';

const Navbar = () => {
    return (
        <nav className='sticky top-0 left-0 right-0 z-50 bg-white flex flex-row justify-between items-center py-2 px-5 border-b border-gray-200'>
            <div className='flex flex-row gap-3 lg:mx-32 md:mx-10'>
                <PenTool />
                <h1>Blog Space</h1>
            </div>
            <div className='flex flex-row gap-10 text-sm'>
                <button className='flex flex-row gap-2 mt-1 hover:bg-gray-200 rounded-md px-4 py-2'>
                    <House size={16} className='mt-1' />
                    <h3>Home</h3>
                </button>

                <button className='flex flex-row mt-1 gap-2 py-2 px-4 rounded-md hover:bg-gray-200'>
                    <UserRound size={18} />
                    <h3>John Doe</h3>
                </button>
            </div>
        </nav>
    )
}

export default Navbar;
