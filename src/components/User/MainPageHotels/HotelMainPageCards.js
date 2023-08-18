import React from 'react'
import { useEffect } from 'react'
import { getHotelsUserApi } from '../../../helpers/apis/userApis'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'

const HotelMainPageCards = () => {
    const [allHotels, setAllHotels] = useState(null)

    const navigate = useNavigate()
    const toBlockUser = (data) => {
        if (data.logHimOut) {
            localStorage.removeItem("userName")
            localStorage.removeItem("userToken")
            navigate('/login')
        }
    }


    useEffect(() => {
        const getAllHotels = async () => {
            const response = await getHotelsUserApi()
            toBlockUser(response)
            setAllHotels(response)
        }

        getAllHotels()
    }, [])




    return (


        <div className='flex flex-col md:flex-row mx-auto container justify-center flex-wrap gap-4 ' >

            {allHotels?.map((hotel) => {
                return (
                    <Link to={`/hotel/${hotel._id}`} key={hotel._id}>
                        <div className='border rounded-xl drop-shadow-2xl ' style={{ backgroundColor: "#ffffff" }} key={hotel._id}>
                            <div className=' w-full md:w-64  px-2 py-2'>
                                <div className='relative overflow-hidden h-60 rounded-lg'>
                                    <img className=' w-full h-full object-fit' src={hotel.images[0]} alt="" />
                                </div>
                                <div className='ml-1 my-2 pt-3'>
                                    <h3 className='font-semibold'>{hotel.name}</h3>
                                    <div className='flex'>
                                        <FontAwesomeIcon icon={faLocationDot} className='w-2 h-5 ' />
                                        <h3 className='ml-2'>{hotel.district}, {hotel.city}</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                )
            })}

            {!allHotels && <div> Loading Data ......</div>

            }



        </div>
    )
}

export default HotelMainPageCards