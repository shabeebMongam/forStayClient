import React from 'react'
import { Link } from 'react-router-dom'

const UserFooter = () => {
    return (
        <div className='bg-[#54B435]'>
            <div className='container mx-auto'>
                <div className='flex justify-between py-10'>
                    <div>
                        <h1 className='text-2xl font-bold'> For Stay   </h1>
                    </div>
                    <div className='font-medium flex ' >
                        <Link to={'/hotels'}>  <h3 className='mx-2'> Hotels </h3> </Link>
                        <Link to={'/profile'}>  <h3 className='mx-2'> Profile </h3> </Link>
                        <Link to={'/bookings'}>   <h3 className='mx-2'> Booking </h3> </Link>
                    </div>
                    <div>
                        <h3 className='font-semibold text-lg'>Thank You</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserFooter