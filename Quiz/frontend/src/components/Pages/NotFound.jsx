import React from 'react'
import { Link } from 'react-router-dom'

const Notfound = () => {
    return (
        <div className="w-full min-h-[100vh] flex items-center justify-center overflow-hidden" >
            <div className="max-w-[1100px] mx-auto flex-col items-center justify-center px-4  text-center overflow-hidden">
                <h1 className='text-5xl capitalize font-semibold tracking-wide text-gray-700 text-center mb-5'>404 Not found</h1>
                <Link className='px-6 py-2 bg-gray-900 text-white rounded-md mt-6' to='/'>Go Back</Link>
            </div>
        </div>
    )
}

export default Notfound