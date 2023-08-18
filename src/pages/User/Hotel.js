import React from 'react'
import Header from '../../components/User/Header/Header'
import { getHotelDataUserApi } from '../../helpers/apis/userApis'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import style from './Hotel.module.css'
import UserFooter from '../../components/User/Footer/UserFooter'


const Hotel = () => {
    const [receivedHotelDatas, setreceivedHotelDatas] = useState()
    const [rooms, setRooms] = useState([])
    const [hotelImages, setHotelImages] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0)


    const { hotelId } = useParams()


    const hotelData = async () => {
        const response = await getHotelDataUserApi(hotelId)
        setreceivedHotelDatas(response)
        setHotelImages(response.images)
        setRooms(response.rooms)



    }

    useEffect(() => {
        hotelData()
    }, [])


    const goToNext = () => {
        const isLastSlide = currentIndex === hotelImages.length - 1
        const newIndex = isLastSlide ? 0 : currentIndex + 1
        setCurrentIndex(newIndex)
    }

    const goToPrev = () => {
        const isFirstSlide = currentIndex === 0
        const newIndex = isFirstSlide ? hotelImages.length - 1 : currentIndex - 1
        setCurrentIndex(newIndex)

    }








    return (
        <div>
            <Header />

            <div className=' min-h-screen' style={{ backgroundColor: "#f2f2f2" }}>
                <div className='mx-auto  container  pt-10 ' >
                    <div className={`flex   flex-row  border rounded-lg p-4   bg-white overflow-x-auto ${style.forScrollBar} `}  >


                        {
                            hotelImages &&

                            hotelImages.map((image, index) => {
                                return (
                                    <div className=' flex \'>
                                        <div className=" h-96 w-96  m-5 " >

                                            <img src={image} alt="" className=' max-h-[600px]  mx-auto rounded-xl ' key={index} />
                                            {/* <img src={hotelImages[currentIndex]} alt="" className=' max-h-[600px]  mx-auto ' /> */}

                                        </div>
                                    </div>
                                )
                            })

                        }
                    </div>

                </div>

                <div className='mx-auto  container  my-10  '>


                    <div className=' bg-white rounded-xl'>
                        <div className='m-5 flex flex-col md:flex-row justify-center items-start  p-5'>
                            <div className='  md:w-1/2 flex justify-between items-end mr-4 mt-5' >
                                <div className=''>
                                    <h1 className='text-4xl font-serif'>
                                        {receivedHotelDatas && receivedHotelDatas.name}
                                    </h1>
                                    <h2 className='text-2xl font-serif'>
                                        {receivedHotelDatas && receivedHotelDatas.district},
                                        {receivedHotelDatas && receivedHotelDatas.city}
                                    </h2>
                                </div>
                                <div>
                                    {/* <h1 className='text-xl'>4.6 (13) </h1> */}
                                </div>
                            </div>

                            <div className='mt-5 md:w-1/2 md:ml-10 '>
                                {receivedHotelDatas && receivedHotelDatas.description}

                            </div>

                        </div>

                    </div>
                </div>

                {/* <div className=' mx-auto container'>
                    <div className='bg-white rounded-xl'>

                        <div className='p-4 flex flex-col md:flex-row justify-between'>
                            <div className=' md:w-1/3'>
                                <label htmlFor="comment">Comment</label>
                                <input type="text" id='comment' className='rounded-lg w-full' />
                            </div>
                            <div className='md:w-1/3 flex items-end justify-center'>   
                                <div className='flex  my-5 md:my-0 justify-center'>
                                    <button className='border px-3 mx-1'>1</button>
                                    <button className='border px-3 mx-1'>2</button>
                                    <button className='border px-3 mx-1'>3</button>
                                    <button className='border px-3 mx-1' >4</button>
                                    <button className='border px-3 mx-1'>5</button>
                             </div>
                            </div>
                            <div className='md:w-1/3 flex justify-evenly'>
                                <button className='border px-3 py-2 rounded-lg'>Submit</button>
                            </div>
                        </div>
                    </div>
                </div> */}

                <div className='mx-auto  container  mt-10  '>
                    <div className='flex flex-col md:flex-row justify-center flex-wrap '>

                        {rooms && rooms.map((room, index) => {
                            return (
                                <div className='flex justify-between py-3 rounded-xl px-4  lg:w-1/2  ' key={index} >
                                    <div className='bg-white w-full rounded-lg'>
                                        <div className='flex p-3 '>
                                            <div className='w-1/3 h-52'>
                                                <img src={room.images[0]} className='max-h-[200px]  rounded-xl' alt="" />
                                            </div>
                                            <div className='px-4 w-2/3 ' >
                                                <h2 className='my-3'>Room type : {room.roomType}</h2>
                                                <hr />
                                                <h2 className='my-1'>Room number : {room.roomNumber}</h2>
                                                {/* <hr /> */}
                                                <h2 className='my-1'>Capacity : {room.totalCapacity}</h2>
                                                {/* <hr /> */}
                                                <h2 className='my-1'>Price : {room.price}</h2>
                                                <div className='flex justify-end items-end  '>
                                                    <Link to={`/room/${hotelId}/${room._id}`}>   <button className="border py-2 px-3 rounded-lg">Book</button></Link>

                                                    {/* <button className='border py-2 px-3 rounded-lg'>Show</button> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                
            </div>
            <UserFooter />

        </div>
    )
}

export default Hotel