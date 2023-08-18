import React from 'react'
import { Link } from 'react-router-dom'

const SidebarLeftOwner = (props) => {
  return (
    <div className='forSidebar w-1/6' >
      <div className=''>
        <ul className=' flex flex-col items-center  mt-10'>
          < li className='border-neutral-600-500 border-b-4  pt-5  w-3/4 ' >  <Link to='/owner'>    Dashboard</Link> </li>
          {/* <li className='border-neutral-600-500 border-b-4  pt-5  w-3/4 '>          <Link to='/owner/profile'>     Profile </Link> </li> */}
          <li className='border-neutral-600-500 border-b-4  pt-5  w-3/4 ' >    <Link to='/owner/hotels'>       Hotels </Link> </li>
          <li className='border-neutral-600-500 border-b-4  pt-5  w-3/4 ' >    <Link to='/owner/allBookings'>       Bookings </Link> </li>
        </ul>
      </div>
    </div>
  )
}

export default SidebarLeftOwner




