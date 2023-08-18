import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ContainerLayout from '../../components/Admin/BoilerPlate/ContainerLayout'
import MainAreaAdmin from '../../components/Admin/BoilerPlate/MainAreaAdmin'
import SidebarLeftAdmin from '../../components/Admin/BoilerPlate/SidebarLeftAdmin'
import Header from '../../components/Admin/Header/Header'
import { approveHotelAdminApi, pendingApprovalsAdminApi } from '../../helpers/apis/adminApis'

const PendingApproval = () => {

    const [pendingHotels, setpendingHotels] = useState([])

    const getData = async ()=>{

        const getPengingApprovals = await pendingApprovalsAdminApi()
        console.log(getPengingApprovals);
        setpendingHotels(getPengingApprovals)
    }

    const approveHotel = (async (hotelId)=>{
            // e.preventDefault()
            console.log(hotelId);
            const response = await approveHotelAdminApi ({hotelId})
            console.log(response);

            setpendingHotels((prePendings)=>{
              return prePendings.filter((htl) => (htl._id !== response.hotelId))
            })

            console.log(pendingHotels);
    })

    useEffect(()=>{
        getData()
    },[])
    

    return (

        <div div >
            <Header />
            <ContainerLayout>
                <SidebarLeftAdmin />
                <MainAreaAdmin>
                    <div className=' m-3 '>
                        <h1 className='mb-10  text-4xl text-gray-900 font-medium '>Pending Approval</h1>
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                            {
                                pendingHotels.length > 0 ?
                                    (
                                        <table className="w-full text-sm text-left text-gray-500 ">
                                            <thead className="text-xs text-gray-900 uppercase  border bg-slate-500">
                                                <tr>
                                                    <th scope="col" className="px-6 py-3">
                                                        Owner Id
                                                    </th>
                                                    <th scope="col" className="px-6 py-3">
                                                        Hotel Name
                                                    </th>
                                                    <th scope="col" className="px-6 py-3">
                                                        Location
                                                    </th>
                                                    {/* <th scope="col" className="px-6 py-3">
                                            Price
                                        </th> */}
                                                    <th scope="col" className="px-6 py-3">
                                                        <span >Action</span>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {pendingHotels.map((hotel) => {
                                                    return (
                                                        <tr key={hotel._id} className="bg-white border-b  hover:bg-gray-100 border ">
                                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                                                {hotel._id}
                                                            </th>
                                                            <td className="px-6 py-4">
                                                                {hotel.name}
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                {hotel.district},{hotel.city}
                                                            </td>
                                                            {/* <td className="px-6 py-4">
                                                $2999
                                            </td> */}
                                                            <td className="px-6 py-4">
                                                                <button className='border px-1 py-1 rounded-md bg-green-700 text-white' onClick={(e) => (e.preventDefault(), approveHotel(hotel._id))}  >  Approve </button>
                                                            </td>
                                                        </tr>
                                                    )
                                                })}

                                            </tbody>
                                        </table>) :

                                    <>
                                        <div className='flex justify-center items-center ' >

                                            No Hotels For Approval
                                        </div>
                                    </>
                            }

                        </div>

                    </div>
                </MainAreaAdmin>
            </ContainerLayout>

        </div >

    )
}

export default PendingApproval







  