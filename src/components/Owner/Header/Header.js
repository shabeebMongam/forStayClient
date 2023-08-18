import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';

const Header = () => {

    const [haveOwner, setHaveOwner] = useState(false)
    const [ownerName, setOwnerName] = useState('')

    // const user = useSelector((store) => store.auth)
    // console.log(user);

    useEffect(() => {
        // console.log(localStorage.getItem('token'));

        const ownerToken = localStorage.getItem('ownerToken')
        const ownerName = localStorage.getItem('ownerName')

        // console.log(userName,userToken);

        if (ownerToken && ownerName) {
            setHaveOwner(true)
            setOwnerName(ownerName)
        }
    }, [])


    const handleLogout = () => {
        localStorage.removeItem("ownerToken");
        localStorage.removeItem("ownerName");
        window.location.reload();
    };

    return (
        <div className=' bg-cyan-800 h-16 flex items-center'>
            <div className='container mx-auto ' >
                <div className='flex justify-between '>
                    <div className='ml-2 my-auto'>
                        <h2 className='font-medium text-2xl text-white'>forStay Owner</h2>
                    </div>
                    <div className=''>
                        {haveOwner ? <button className='mr-4 border-solid border-2 border-black-500 px-3 py-1 rounded-md bg-slate-50 font-medium' onClick={handleLogout}><Link  > Logout --  {ownerName} </Link>  </button> :
                            <>
                                <button className='mr-4 border-solid border-2 border-black-500 px-3 py-1 rounded-md bg-slate-50 font-medium'><Link to='/owner/login'>Login </Link></button>
                                <button className=' border-solid border-2 border-black-500 px-3 py-1 rounded-md bg-slate-50 font-medium'><Link to='/owner/register'>Register </Link></button> </>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header