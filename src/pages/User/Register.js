import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../../components/Common/Loader/Loading';
import { registerUserApi } from '../../helpers/apis/userApis';

const Register = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [loading, setLoading] =useState (false)

    const [error, setError] = useState("");

    const notify = (msg) => toast(msg);

    useEffect(() => {
        const checkUserToken = localStorage.getItem('userToken')
        if (checkUserToken) {
            navigate("/")
        }
    }, [])
    const emailInputHandler = (e) => {
        if (error.length > 0) {
            setError("")
        }
        setEmail(e.target.value)
    }
    const passwordInputHandler = (e) => {
        if (error.length > 0) {
            setError("")
        }
        setPassword(e.target.value)
    }
    const nameInputHandler = (e) => {
        if (error.length > 0) {
            setError("")
        }
        setName(e.target.value)
    }




   


    const register = async (event) => {
        event.preventDefault()
        setLoading(true)
        if (error.length > 0) {
            setError("")
        }

        // try {
        const response = await registerUserApi({
            email, password, name
        });
        if (response.data) {
            setError(response.data.message)
            setLoading(false)
        } else {
            // setMsg(response);
            notify(response)
            // console.log(response);
            setName("")
            setEmail("")
            setPassword("")
            setLoading(false)
        }


        // } catch (error) {
        //     console.error(error);
        //     if (
        //         error.response &&
        //         error.response.status >= 400 &&
        //         error.response.status <= 500
        //     ) {
        //         setError(error.response.data.message);
        //         // notify(error.response.data.message)
        //     }
        // }
    }
    return (
        <div className=' bg-red-500 h-screen flex items-center'>

            
            {loading && <Loading />  }
                
            <div className='container mx-auto h-5/6 border-solid border-2 bg-slate-50 border-black  rounded-lg' >

                <div className='flex h-full '>
                    <div className='w-full lg:w-1/3  flex items-center justify-center border-r flex-col border-black'  >
                        <p className='mb-10 text-3xl w-full px-10 font-bold'>forStay Register</p>

                        <form className='flex flex-col w-full px-10' onSubmit={register}>
                            <input type="text" className='px-2 rounded h-10  border-black border text-black placeholder-black' placeholder='Name' name='name' value={name} onChange={nameInputHandler} />
                            <input type="email" className= 'px-2 mt-3 rounded h-10  border-black border text-black placeholder-black' placeholder='Email' name='email' value={email} onChange={emailInputHandler} />
                            <input type="password" className='px-2 mt-3 rounded h-10  border-black border text-black placeholder-black' placeholder='Password' name='password' value={password} onChange={passwordInputHandler} />
                            {error && <div className='bg-red-700 border rounded-lg text-white px-3 py-2 mt-5 text-center' >{error}</div>}
                            <div className='text-right mt-2 '>
                                <button className='border rounded-lg px-7 py-1 bg-red-500 text-white text-lg'> Register </button>
                            </div>
                           
                            {/* {msg && <div >{msg}</div>} */}
                        </form>
                        <div className=' text-end mt-10 ml-auto px-10'>
                            <p className=''>Already have an Account? <span className='font-bold'> <Link to='/login'> Login </Link> </span> </p>
                        </div>
                    </div>
                    <div className='hidden lg:flex items-center justify-center 0 w-2/3 registerBG  '>
                        <h2 className='text-black'> <Link to={'/'}>forStay</Link></h2>
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

export default Register