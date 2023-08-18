import React from 'react'
import { Link } from 'react-router-dom'

const Details = () => {
    return (
        <div className='mt-20' >
            <div className='container mx-auto flex justify-center'>
               <Link to='/bookings'>
               <button className='border p-4 rounded-lg'>MyBookings</button>
                </Link>
            </div>

        </div>
    )
}

export default Details