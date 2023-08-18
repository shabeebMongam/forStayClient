import React from 'react'
import { Link } from 'react-router-dom'
import { FiChevronDown } from "react-icons/fi";
import { useState } from 'react';

const Dropdown = ({ userName }) => {

    const [toggle, setToggle] = useState(false)

    const handleLogout = () => {
        localStorage.removeItem("userToken");
        localStorage.removeItem("userName");
        window.location.reload();
    };
    return (
        <div className='relative text-white  z-10'>
            <button className=' px-5 py-3 rounded-xl flex text-lg text-center ' style={{ backgroundColor: "#54B435", color: "#ffffff" }} onClick={() => setToggle(!toggle)}>{userName.toUpperCase()} <span className='my-auto mx-2'><FiChevronDown /></span> </button>
            {toggle &&
                <div className='absolute  w-full  rounded-lg mt-1 right-2  text-lg  z-10' style={{ backgroundColor: "#54B435", color: "#ffffff" }} >
                    <div className=' w-full  '>
                        <li className='list-none py-2 px-2 '>
                            <Link to={'/profile'} >Profile</Link>
                        </li>
                        <li className='list-none py-2 px-2 w-full' >
                            <Link to={'/hotels'}>Hotels</Link>
                        </li>

                        <li className='list-none py-2 px-2  '>
                            <Link to={'/bookings'} >Bookings</Link>
                        </li>
                        <hr />

                        <li className='list-none py-2 px-2 ' onClick={handleLogout}>
                            <Link>Sign Out</Link>
                        </li>
                    </div>

                </div>}

        </div>
    )
}

export default Dropdown