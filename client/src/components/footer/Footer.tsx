import { Copyright } from 'lucide-react'
import React from 'react'

const Footer: React.FC = () => {
    return (
        <div className="h-16 w-full bg-gray-800 text-white flex justify-center items-center">
            <p className='text-center text-sm flex flex-col justify-center items-center md:flex-row py-4 gap-1 md:gap-4' >Created by Aadarsh Guru.
                <a className='flex gap-2 hover:text-gray-300' href="http://aadarshguru.vercel.app" target="_blank" rel="noopener noreferrer">
                    Copyright <Copyright className='text-[10px]' /> aadarshguru.com
                </a>
            </p>
        </div>
    )
}

export default Footer