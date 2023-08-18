import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import Dropdown from '../Dropdown/Dropdown';

const Header = () => {

    const [haveUser, setHaveUser] = useState(false)
    const [userName, setUserName] = useState('')



    useEffect(() => {
        const userToken = localStorage.getItem('userToken')
        const userName = localStorage.getItem('userName')
        if (userToken && userName) {
            setHaveUser(true)
            setUserName(userName)
        }
    }, [])
    return (
        <div className='  h-20 flex items-center  z-10  ' style={{ backgroundColor: "#ffffff" }} >
            <div className='container mx-auto ' >
                <div className='flex justify-between '>
                    <div className='ml-2 my-auto'>
                        <Link to={"/"} >   <button className='font-medium text-4xl    rounded-2xl' style={{ color: "#54B435", borderColor: "#3C2A21", fontFamily: 'Pacifico,cursive ' }} >   forStay  </button> </Link>

                    </div>
                    <div className='flex items-end '>
                        <Link to={'/hotels'}> <p className='hidden md:block  mr-10 font-black text-xl hover:border-b-2  border-[#3C2A21] cursor-pointer' style={{ color: "#54B435" }}>HOTELS</p></Link>
                        {haveUser ? <Dropdown userName={userName} /> : <div className='   mt-2'>
                            <button className='mr-4  text-lg  px-3 py-1 rounded-md  font-medium' style={{ backgroundColor: "#54B435", color: "#ffffff" }}><Link to='/login'>Login </Link></button>
                            <button className='  text-lg px-3 py-1 rounded-md font-medium' style={{ backgroundColor: "#54B435", color: "#ffffff" }}><Link to='/register'>Register </Link></button>
                        </div>}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Header