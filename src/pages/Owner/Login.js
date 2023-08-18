import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { addUserDetailes } from '../../redux/slices/userAuth';
import { useNavigate } from "react-router-dom";


const Login = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const notify = (msg) => toast(msg);



  useEffect(() => {
    const checkOwnerToken = localStorage.getItem('ownerToken')
    if (checkOwnerToken) {
      navigate("/owner")
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
      setLoading(true)

      const ownerLoginUrl = `${process.env.REACT_APP_OWNER_BASE_URL}/login`

      const response = await axios.post(ownerLoginUrl, {
        email, password
      });
      // console.log(response.data);
      if (response.data.logHimOut) {
        toast("Owner is Blocked")
        // navigate("/");
      } else {
      localStorage.setItem("ownerToken", response.data.ownerToken);
      localStorage.setItem("ownerName", response.data.ownerName);
      localStorage.setItem("ownerId", response.data.ownerId);
      // dispatch(addUserDetailes(response.data))
      setLoading(false)
      navigate("/owner");
      }

    } catch (error) {
      console.error(error);
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setLoading(false)
        // notify(error.response.data.message)
        setError(error.response.data.message);
      }
    }

  }

  return (
    <div className=' bg-cyan-800 h-screen flex items-center'>
      <div className='container mx-auto h-5/6 border-solid border-2 bg-slate-50  border-black rounded-lg ' >
        <div className='flex h-full '>

          <div className='w-full lg:w-1/3  flex items-center justify-center flex-col border-black  border-r' >

            <p className='mb-10 text-3xl w-full px-10 font-bold'>forStay Owner Login</p>

            <form action="" className='flex flex-col w-full px-10' onSubmit={login}>
              <input type="text" className='rounded h-10 pl-5 border-black border text-black placeholder-black ' name='email' placeholder='Email' onChange={emailInputHandler} />
              <input type="password" className='mt-3 rounded h-10 pl-5 border-black border text-black placeholder-black ' name='password' placeholder='Password' onChange={passwordInputHandler} />
              {error && <div className='bg-red-700 border rounded-lg text-white px-3 py-2 mt-5 text-center' >{error}</div>}

              <div className='text-right mt-2'>
                <button className='border rounded-lg px-7 py-1 bg-red-500 text-white text-lg'>Login</button>

              </div>
              {/* {error && <div >{error}</div>} */}


            </form>
            <div className='mt-10 text-end ml-auto px-10'>
              <p className=''>Don't have an Owner account? <span className='font-bold'> <Link to='/owner/register'>  Register </Link> </span> </p>
            </div>

          </div>
          <div className='hidden lg:flex items-center justify-center 0 w-2/3  loginOwnerBG'>
            {/* <img src="./assets/pexels-pixabay-271639.jpg" alt="" className="" /> */}
            <h2 className='text-black'><Link to={'/owner'}>forStay</Link></h2>
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
   
    </div>
  )
}

export default Login