import React from 'react'
import Header from '../../components/User/Header/Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { useEffect } from 'react'
import { getHotelsUserApi } from '../../helpers/apis/userApis'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import UserFooter from '../../components/User/Footer/UserFooter'

const ListHotels = () => {
  const [allHotels, setAllHotels] = useState([])
  const location = useLocation()

  const navigate = useNavigate()
  const toBlockUser = (data) => {
    if (data.logHimOut) {
      localStorage.removeItem("userName")
      localStorage.removeItem("userToken")
      navigate('/login')
    }
  }


  useEffect(() => {

    const searchDatas = location.state

    if(searchDatas){
      const getAllHotelsWithSearch = async () => {
        const response = await getHotelsUserApi(searchDatas.place)
        toBlockUser(response)
        setAllHotels(response)
      }
      getAllHotelsWithSearch()
    }else{
      const getAllHotels = async () => {
        const response = await getHotelsUserApi()
        toBlockUser(response)
        setAllHotels(response)
      }
      getAllHotels()
    }

   

    
  }, [])
  return (
    <>
      <Header />

      <div className=' bg-slate-500 mx-auto' style={{ backgroundColor: "#f2f2f2" }}>
        <div className='container mx-auto'>

          {/* <div className=' pt-16 pb-10 flex justify-center'>
            <input type="text" className='text-md  font-medium border border-gray-700   rounded-lg  w-1/3' placeholder='Search' />
            <button className=' text-md text-gray-500 ml-5 border border-gray-700 font-medium py-2 px-20 rounded-lg bg-white'>Sort</button>
          </div> */}


          <div className='py-10 h-screen'>

            <div className='flex flex-col md:flex-row mx-auto container justify-center flex-wrap gap-5 w-full px-5 ' >
              {allHotels.length > 0 && allHotels.map((hotel) => {
                return (
                  <Link to={`/hotel/${hotel._id}`}>
                    <div className='border rounded-xl drop-shadow-2xl  ' style={{ backgroundColor: "#ffffff" }} key={hotel._id}>
                      <div className=' w-full md:w-80  px-2 py-2'>
                        <div className='relative overflow-hidden h-80 rounded-lg'>
                          <img className=' w-full h-full object-fit' src={hotel.images[0]} alt="" />
                        </div>

                        <div className='ml-1 my-2 pt-3 flex flex-col '>
                          <div className='flex'>
                            <div className='w-2/3 '>
                              <h3 className='font-medium' style={{ color: "#11222a" }}>{hotel.name}</h3>
                              <div className='flex flex-col'>
                                <div className='flex' style={{ color: "#11222a" }}>
                                  <FontAwesomeIcon icon={faLocationDot} className='w-2 h-5 ' />
                                  <h3 className='ml-2'>{hotel.district} - {hotel.city}</h3>
                                </div>
                              </div>
                            </div>
                            {/* <div className='w-1/3 flex justify-end items-end' style={{ color: "#11222a" }}>
                              <h3>4.6 (16)</h3>
                            </div> */}
                          </div>
                          <button className='py-2 border mt-2 rounded-lg text-white text-lg font-bold ' style={{ backgroundColor: "#54B435", color: "#11222a" }}>SHOW</button>
                        </div>
                      </div>
                    </div>
                  </Link>
                )
              })}



            </div>
          </div>






        </div>
      </div>
      <UserFooter/>
    </>
  )
}

export default ListHotels