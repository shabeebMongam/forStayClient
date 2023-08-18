import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import Loading from '../../components/Common/Loader/Loading'
import ContainerLayout from '../../components/Owner/BoilerPlate/ContainerLayout'
import MainAreaOwner from '../../components/Owner/BoilerPlate/MainAreaOwner'
import SidebarLeftOwner from '../../components/Owner/BoilerPlate/SidebarLeftOwner'
import Header from '../../components/Owner/Header/Header'
import OwnerLoading from '../../components/Owner/Loading/OwnerLoading'
import { approveRoomOwnerApi, bookedDetailsOwnerApi } from '../../helpers/apis/ownerApis'

const ReceivedBookingDetails = () => {
    const { bookedId } = useParams()
    const notify = (msg) => toast(msg);

const navigate = useNavigate()
    const [bookedData, setBookedData] = useState([])
    const [hotelData, setHotelData] = useState([])
    const [roomData, setRoomData] = useState([])

    const[deletedItem,setDeletedItem] = useState(false)

    const [loading, setLoadig] = useState(false)



    useEffect(() => {
        const bookedDetails = async () => {
            setLoadig(true)

            const response = await bookedDetailsOwnerApi(bookedId)
            if(response.deletedItem){
                console.log("here");
                setDeletedItem(true)
                setLoadig(false)

            }else{
                console.log(response);
                setBookedData(response[0])
                setHotelData(response[0].hotelId)
                setRoomData(response[0].roomId)
                setLoadig(false)
            }
            

        }

        bookedDetails()
    }, [])

    const approveRoom = async (dataId) => {
        const response = await approveRoomOwnerApi(dataId)
        if (response.message) {
            notify(response.message)
            if(response.deletedItem){
                setBookedData((prevData)=>{
                    return(
                            prevData.filter((item)=>item._id!==dataId)
                    )
                })
            }
        }
        setTimeout(navigate('/owner/bookings'),3000)
        
    }

    return (
        <div>
            <Header />

            <ContainerLayout>
                <SidebarLeftOwner />
                <MainAreaOwner>
                    {loading && <Loading/>}
                    {(bookedData && hotelData && roomData && !deletedItem) && <div className="flex mt-10  w-full justify-center ">
                        <div className="w-1/2">
                            <div className="bg-white shadow-xl rounded-lg py-3">
                                <div className="photo-wrapper p-2">
                                    {/* <img className="w-32 h-32  mx-auto" src={hotelData.images[0]} alt="John Doe"/> */}
                                </div>
                                <div className="p-2">
                                    <h3 className="text-center text-xl text-gray-900 font-medium leading-8">{hotelData.name}</h3>
                                    <div className="text-center text-gray-400 text-xs font-semibold">
                                        <p>{hotelData.district} - {hotelData.city}</p>
                                    </div>
                                    <table className="text-xs my-3">
                                        <tbody><tr>
                                            <td className="px-2 py-2 text-gray-500 font-semibold">Room Number</td>
                                            <td className="px-2 py-2">{roomData.roomNumber}</td>
                                        </tr>
                                            <tr>
                                                <td className="px-2 py-2 text-gray-500 font-semibold">Type</td>
                                                <td className="px-2 py-2">{roomData.roomType}</td>
                                            </tr>
                                            <tr>
                                                <td className="px-2 py-2 text-gray-500 font-semibold">Check In</td>
                                                <td className="px-2 py-2">{bookedData.startDate}</td>
                                            </tr>
                                            <tr>
                                                <td className="px-2 py-2 text-gray-500 font-semibold">Check Out</td>
                                                <td className="px-2 py-2">{bookedData.endDate}</td>
                                            </tr>
                                        </tbody></table>

                                    <div className=" my-10 ml-10">

                                            <h1>
                                               Name :  {bookedData.name}
                                            </h1>
                                            <h1>
                                              Email :  {bookedData.email}
                                            </h1>
                                            <h1>
                                               City : {bookedData.city}
                                            </h1>
                                            <h1>
                                              State :  {bookedData.state}
                                            </h1>

                                        {/* <a className="text-xs text-indigo-500 italic hover:underline hover:text-indigo-600 font-medium" href="#">View Profile</a> */}
                                    </div>

                                </div>
                        <div className='flex justify-end mr-5'>

                                    <button className='border px-3 py-1 rounded-md bg-gradient-to-r from-teal-500 to-blue-700' onClick={() => approveRoom(bookedData._id)}> Approve </button>
                        </div>
                            </div>
                        </div>



                    </div>}

                    {deletedItem && <div>
                        This Data is removed
                        </div>}

                </MainAreaOwner>
            </ContainerLayout>
        </div>
    )
}

export default ReceivedBookingDetails