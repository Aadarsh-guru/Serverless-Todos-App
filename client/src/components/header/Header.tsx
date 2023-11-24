import { useAuth } from '@/contexts/AuthProvider'
import React from 'react'
import { Button } from '../ui/button';
import { LogOut, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {

    const { auth, handleLogout } = useAuth();

    return (
        <div className="h-16 w-full bg-black/90 text-white fixed top-0 flex items-center justify-between py-2 px-4">
            <h1 className='text-2xl font-semibold cursor-pointer select-none' >
                Todo's App
            </h1>
            <h4 className='hidden md:block text-xl text-gray-200 font-semibold select-none' >
                {auth?.user?.name}
            </h4>
            {
                auth?.user ?
                    <Button
                        onClick={() => handleLogout()}
                        className='transition-transform hover:text-red-600 active:scale-95'
                    >
                        <LogOut />
                    </Button>
                    :
                    <Link to={'/register'} >
                        <User />
                    </Link>
            }
        </div>
    )
}

export default Header