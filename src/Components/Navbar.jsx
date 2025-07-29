import React from 'react'
import { PenTool, House, UserRound } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../Hooks/useAuth'

const Navbar = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  return (
    <nav className='fixed bg-white/30 backdrop-blur-xl top-0 left-0 right-0 z-50  flex flex-row justify-between items-center py-2 px-5 border-b border-gray-200'>
      <div className='flex flex-row gap-3 lg:mx-32 md:mx-10 cursor-pointer' onClick={() => navigate('/')}>
        <PenTool />
        <h1>Blog Space</h1>
      </div>

      <div className='flex flex-row gap-5 text-sm'>
        <button
          onClick={() => navigate('/')}
          className='flex flex-row gap-2 mt-1 hover:bg-gray-200 rounded-md px-4 py-2'
        >
          <House size={16} className='mt-1' />
          <h3>Home</h3>
        </button>

        {user ? (
          <button
            onClick={() => navigate('/user')}
            className='flex flex-row mt-1 gap-2 py-2 px-4 '
          >
            <UserRound className='rounded-md hover:bg-gray-200' size={18} />
            <h3>{user.name}</h3>
          </button>
        ) : (
          <div className='py-1 flex flex-row gap-2'>
            <button
              type='button'
              onClick={() => navigate('/signup')}
              className='text-sm font-semibold py-1 px-4 border border-gray-200 hover:bg-gray-200 text-black rounded-md'
            >
              Signup
            </button>
            <button
              type='button'
              onClick={() => navigate('/login')}
              className='text-sm font-semibold py-1 px-4 bg-black text-white rounded-md'
            >
              Login
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
