import React from 'react'
import { Link } from 'react-router-dom'

const SidebarLeftAdmin = () => {
  return (
      <div className='forSidebar w-1/6' >
          <div className=''>
              <ul className='flex flex-col items-center  mt-10'>
                  <li className='border-neutral-600-500 border-b-4  pt-5  w-3/4 ' > <Link to='/admin'> Dashboard  </Link>    </li>
                  <li className='border-neutral-600-500 border-b-4  pt-5  w-3/4 '> <Link to='/admin/users'> Users  </Link>    </li>
                  <li className='border-neutral-600-500 border-b-4  pt-5  w-3/4 '> <Link to='/admin/owners'> Owners  </Link>    </li>
                  <li className='border-neutral-600-500 border-b-4  pt-5  w-3/4 '> <Link to='/admin/hotels'> Hotels  </Link>    </li>
                  <li className='border-neutral-600-500 border-b-4  pt-5  w-3/4 '> <Link to='/admin/approval'> Approvals  </Link>    </li>
              </ul>
          </div>
      </div>
  )
}

export default SidebarLeftAdmin