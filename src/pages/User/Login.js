import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUserDetailes } from '../../redux/slices/userAuth';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { loginUserApi } from '../../helpers/apis/userApis';



const Login = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)


     useEffect(()=>{
        const checkUserToken = localStorage.getItem('userToken')
        if(checkUserToken){
            navigate("/")
        }
     },[])
    
    const dispatch =  useDispatch()

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    const emailInputHandler = (e)=>{
        setEmail(e.target.value)
    }

    const passwordInputHandler = (e)=>{
        setPassword(e.target.value)
    }
    const [error, setError] = useState("");

    const login = async (event) => {
        event.preventDefault()
        setLoading(true)


        try {
            console.log("Here");
            
            const loginUrl = `${process.env.REACT_APP_USER_BASE_URL}/login`
            console.log(loginUrl);

            const response = await axios.post(loginUrl,{
                email,password
            });

            if (response.data.logHimOut){
                toast("User is Blocked")
                setLoading(false)
                // navigate("/");
            }else{
                localStorage.setItem("userToken", response.data.userToken);
                localStorage.setItem("userName", response.data.userName);
                dispatch(addUserDetailes(response.data))
                setLoading(false)
                navigate("/");
            }
            
        } catch (error) {
            console.error(error);
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                // setError(error.response.data.message);
                setLoading(false)
                toast(error.response.data.message);

            }
        }

    }

    return (
        <div className=' bg-red-500 h-screen flex items-center'>
            {/* <div className='container mx-auto h-5/6 border-solid border-2 bg-slate-50  border-black rounded-lg ' > */}
            <div className='container mx-auto h-5/6  bg-slate-50  rounded-lg drop-shadow-2xl' >
                <div className='flex h-full '>
                  
                    <div className='w-full lg:w-1/3  flex items-center justify-center flex-col  border-r' >

                        <p className='mb-10 text-3xl w-full px-10 font-bold'>forStay Login</p>

                        <form action="" className='flex flex-col w-full px-10' onSubmit={login}>
                            <input type="text" className='rounded h-10 pl-5  border-black border text-black placeholder-black ' name='email' placeholder='Email' onChange={emailInputHandler} />
                            <input type="password" className='mt-3 rounded h-10 pl-5  border-black border text-black placeholder-black ' name='password' placeholder='Password' onChange={passwordInputHandler} />
                            <div className='text-right mt-2'>
                                <button className='border rounded-lg px-7 py-1 bg-red-500 text-white text-lg'>Login</button>

                            </div>
                            {error && <div >{error}</div>}
                            

                        </form>
                        <div className='mt-10 text-end ml-auto px-10'>
                            <p className=''>Not registered yet? <span className='font-bold'> <Link to='/register'>  Register </Link> </span> </p>
                        </div>

                    </div>
                    <div className='hidden lg:flex items-center justify-center 0 w-2/3 loginBG '>
                        {/* <img src="./assets/pexels-pixabay-271639.jpg" alt="" className="" /> */}
                        {/* <h2 className='text-black'><Link to={'/'}>forStay</Link></h2> */}
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