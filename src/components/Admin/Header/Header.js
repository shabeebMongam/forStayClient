import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';

const Header = () => {

    const [haveAdmin, setHaveAdmin] = useState(false)
    const [adminName, setAdminName] = useState('')

    // const user = useSelector((store) => store.auth)
    // console.log(user);

    useEffect(() => {
        // console.log(localStorage.getItem('token'));

        const adminToken = localStorage.getItem('adminToken')
        const adminName = localStorage.getItem('adminName')

        // console.log(userName,userToken);

        if (adminToken && adminName) {
            setHaveAdmin(true)
            setAdminName(adminName)
        }
    }, [])


    const handleLogout = () => {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminName");
        window.location.reload();
    };

    return (
        <div className=' bg-fuchsia-800 h-16 flex items-center'>
            <div className='container mx-auto ' >
                <div className='flex justify-between '>
                    <div className='ml-2 my-auto'>
                        <h2 className='font-medium text-2xl'>forStay Admin</h2>
                    </div>
                    <div className=''>
                        {haveAdmin ? <button className='mr-4 border-solid border-2 border-black-500 px-3 py-1 rounded-md bg-slate-50 font-medium' onClick={handleLogout}><Link  > Logout --  {adminName} </Link>  </button> :
                            <>
                                <button className='mr-4 border-solid border-2 border-black-500 px-3 py-1 rounded-md bg-slate-50 font-medium'><Link to='admin/login'>Login </Link></button>
                                <button className=' border-solid border-2 border-black-500 px-3 py-1 rounded-md bg-slate-50 font-medium'><Link to='admin/register'>Register </Link></button> </>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header