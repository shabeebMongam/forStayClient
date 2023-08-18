import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUserDetailes } from '../../redux/slices/userAuth';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';



const Login = () => {
    const navigate = useNavigate()

    useEffect(() => {
        const checkAdminToken = localStorage.getItem('adminToken')
        if (checkAdminToken) {
            navigate("/admin")
        }
    })

    const dispatch = useDispatch()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const emailInputHandler = (e) => {
        setEmail(e.target.value)
        // console.log(email);
    }

    const passwordInputHandler = (e) => {
        setPassword(e.target.value)
        // console.log(email);
    }

    const [error, setError] = useState("");

    const login = async (event) => {
        event.preventDefault()

        try {
            const adminLoginUrl = `${process.env.REACT_APP_ADMIN_BASE_URL}/login`

            const response = await axios.post(adminLoginUrl, {
                email, password
            });

            if (response.data.logHimOut) {
                toast("Admin is Blocked")
                // navigate("/");
            }else{
                localStorage.setItem("adminToken", response.data.adminToken);
                localStorage.setItem("adminName", response.data.adminName);
                navigate("/admin");
            }
         

        } catch (error) {
            console.error(error);
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message);
            }
        }

    }

    return (
        <div className=' bg-fuchsia-800 h-screen flex items-center'>
            <div className='container mx-auto h-5/6 border-solid border-2 bg-slate-50  border-black rounded-lg ' >
                <div className='flex h-full '>

                    <div className='w-full lg:w-1/3  flex items-center justify-center flex-col border-black  border-r' >

                        <p className='mb-10 text-3xl w-full px-10 font-bold'>forStay Admin Login</p>

                        <form action="" className='flex flex-col w-full px-10' onSubmit={login}>
                            <input type="text" className='rounded h-10 placeholder:pl-[14px] border-black border text-black placeholder-black ' name='email' placeholder='Email' onChange={emailInputHandler} />
                            <input type="password" className='mt-3 rounded h-10 placeholder:pl-[14px] border-black border text-black placeholder-black ' name='password' placeholder='Password' onChange={passwordInputHandler} />
                            <div className='text-right mt-2'>
                                <button className='border rounded-lg px-7 py-1 bg-red-500 text-white text-lg'>Login</button>

                            </div>
                            {error && <div >{error}</div>}


                        </form>
                        {/* <div className='mt-10 text-end ml-auto px-10'>
                            <p className=''>Don't have an Owner account? <span className='font-bold'> <Link to='/ow/register'>  Register </Link> </span> </p>
                        </div> */}

                    </div>
                    <div className='hidden lg:flex items-center justify-center 0 w-2/3 loginAdminBG '>
                        {/* <img src="./assets/pexels-pixabay-271639.jpg" alt="" className="" /> */}
                        <h2 className='text-black'><Link to={'/admin'}>forStay</Link></h2>
                    </div>
                </div>
            </div>
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </div>
    )
}

export default Login