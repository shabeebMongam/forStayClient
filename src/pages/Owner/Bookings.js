import React, { useEffect, useState } from 'react'
import ContainerLayout from '../../components/Owner/BoilerPlate/ContainerLayout'
import MainAreaOwner from '../../components/Owner/BoilerPlate/MainAreaOwner'
import SidebarLeftOwner from '../../components/Owner/BoilerPlate/SidebarLeftOwner'
import Header from '../../components/Owner/Header/Header'
import { approveRoomOwnerApi, bookingPendingOwnerApi } from '../../helpers/apis/ownerApis'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'

const Bookings = () => {
    const notify = (msg) => toast(msg);
    const navigate = useNavigate()

    const [pending, setPending] = useState([])


    const getPending = async () => {

        const pendingResponse = await bookingPendingOwnerApi()

        console.log(pendingResponse);
        setPending(pendingResponse)



    }

    useEffect(() => {
        getPending()
    }, [])

    const seeBookingDetails = (dataId)=>{

        navigate(`/owner/receivedBooking/${dataId}`)
    }

    return (
        <div>
            <Header />

            <ContainerLayout>
                <SidebarLeftOwner />
                <MainAreaOwner>
                    <div className='m-2 ' >
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">

                            {pending.length>0?
                                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 border">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
                                        <tr className='bg-slate-400 text-black font-black text-base'>

                                            <th scope="col" className="px-6 py-3">
                                                Hotel name
                                            </th>
                                            <th scope="col" className="px-1 py-3">
                                                Room Number
                                            </th>
                                           
                                            <th scope="col" className="px-6 py-3">
                                                Actions
                                            </th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {pending.map((data)=>{
                                            return(
                                            <tr className="bg-white border-b  text-black hover:bg-gray-300 " key={data._id}>
                                                <td className="px-6 py-4">
                                                    {data.hotelId.name}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {data.roomId.roomNumber}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {/* <button className='border px-3 py-1 rounded-md bg-green-400' onClick={()=>approveRoom(data._id)} >Approve</button> */}
                                                        <button className='border px-3 py-1 rounded-md ml-2 bg-blue-300' onClick={()=>seeBookingDetails(data._id)} >See Details</button>
                                                </td>

                                            </tr>
                                            )
                                        })}
                                        
                                    </tbody>
                                </table> 
                                : <div className='flex justify-center'>No Data to display</div> }

                                
                           
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


                </MainAreaOwner>
            </ContainerLayout>
        </div>
    )
}

export default Bookings