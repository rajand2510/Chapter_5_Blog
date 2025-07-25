import React from 'react'
import { ArrowLeft, MessageCircle, User } from 'lucide-react'
import { Outlet, useNavigate } from 'react-router-dom'
const MainPost = () => {

    const navigate = useNavigate();
    return (
        <div className='m-4 lg:mx-[25%] md:mx-4 flex flex-col  '>
            <div className='flex flex-row justify-between items-center'>
                <button
                    onClick={() => { navigate('/') }}
                    className='px-2 py-2 flex flex-row gap-2  text-xs rounded-lg hover:bg-gray-200'>
                    <ArrowLeft className='pt-1' size={14} />
                    <h1>back to posts</h1>
                </button>
                <div className='flex flex-row gap-2 '>
                    <div className='bg-gray-200 p-2 w-9 rounded-full'><User size={20} className='  ' /></div>
                    <div className='flex flex-col text-xs m-1'>
                        <h4>
                            John Doe
                        </h4>
                        <p className=' text-[9px] text-gray-500'>20 jan 2025</p>
                    </div>
                </div>
            </div>
            <div className=' mt-5 flex flex-col gap-12  rounded-xl h-auto p-2 '>

                <div className='m-2'>
                    <h2 className='text-lg'>
                        The Future of Web Development: Trends to Watch in 2025
                    </h2>
                    <h4 className='text text-gray-500'>
                        The web development landscape is constantly evolving, and 2025 promises to bring exciting new trends that will reshape how we build
                    </h4>
                    <div className='flex flex-row gap-2 mt-2'>
                        <span className="inline-block bg-gray-200 text-black text-xs  px-2.5 py-0.5 rounded-full">
                            New
                        </span>
                        <span class="inline-block bg-gray-200 text-black text-xs  px-2.5 py-0.5 rounded-full">
                            New
                        </span>
                        <span class="inline-block bg-gray-200 text-black text-xs  px-2.5 py-0.5 rounded-full">
                            New
                        </span>


                    </div>
                </div>

            </div>
            <div className='m-4'>
                <p className='text-sm'>
                    Introduction

                    The web development landscape is constantly evolving, and 2025 promises to bring exciting new trends that will reshape how we build and interact with web applications. In this comprehensive guide, we'll explore the most significant developments that developers should keep an eye on.


                    1. AI-Powered Development Tools

                    Artificial Intelligence is revolutionizing the way we write code. From intelligent code completion to automated testing and bug detection, AI tools are becoming indispensable for modern developers.


                    Key Benefits:
                    Faster Development: AI can generate boilerplate code and suggest optimizations
                    Better Code Quality: Automated code reviews and bug detection
                    Enhanced Productivity: Intelligent refactoring and code generation

                    2. Progressive Web Apps (PWAs) Evolution

                    PWAs continue to bridge the gap between web and native applications. With improved browser support and new capabilities, PWAs are becoming more powerful than ever.


                    Latest Features:
                    Advanced offline capabilities
                    Better device integration
                    Improved performance metrics
                    Enhanced security features

                    3. Edge Computing and CDN Evolution

                    The rise of edge computing is changing how we think about web performance and data delivery. By processing data closer to users, we can achieve unprecedented speed and reliability.


                    Conclusion

                    As we move through 2025, these trends will continue to shape the future of web development. Staying informed and adapting to these changes will be crucial for developers who want to remain competitive in this rapidly evolving field.


                    The key is to start experimenting with these technologies now, so you're prepared when they become mainstream. Which of these trends are you most excited about?
                </p>
            </div>
            <div className='border-t border-b border-gray-200 p-4 m-2'>
                <button  onClick={()=>{navigate('comment')}} className='flex flex-row gap-2 cursor-pointer'>
                    <MessageCircle size={18} color="#99a1af" />
                    <p className='text-sm text-gray-500'>2 Comments</p>
                </button>
            </div>
            <Outlet/>
        </div>
    )
}

export default MainPost