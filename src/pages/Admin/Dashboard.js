import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ContainerLayout from '../../components/Admin/BoilerPlate/ContainerLayout'
import MainAreaAdmin from '../../components/Admin/BoilerPlate/MainAreaAdmin'
import SidebarLeftAdmin from '../../components/Admin/BoilerPlate/SidebarLeftAdmin'
import Header from '../../components/Admin/Header/Header'
import { dataForAdminDashboardAdminApi } from '../../helpers/apis/adminApis'
import { useState } from 'react'

const Dashboard = () => {
    const navigate = useNavigate()
    const [userCount,setUserCount] = useState()
    const [hotelCount,setHotelCount] = useState()
    const [roomCount,setRoomCount] = useState()
    const [ownerCount,setOwnerCount] = useState()
    

    useEffect(()=>{
        const getDashData =async ()=>{
            const response = await dataForAdminDashboardAdminApi()
            console.log(response);
            setUserCount(response.usersCount)
            setHotelCount(response.hotelCount)
            setRoomCount(response.roomCount)
            setOwnerCount(response.ownersCount)
        }
        getDashData()

    })


    return (
        <div>
            <Header />
            <ContainerLayout>
                <SidebarLeftAdmin />
                <MainAreaAdmin>
                    <div className=' flex flex-col  h-screen my-10 '>
                        <div className='flex justify-evenly  w-full '>
                            <div className='border p-3 flex flex-col items-center rounded-lg'>
                                <h1>Number of Hotels</h1>
                                <p>{hotelCount && hotelCount}</p>
                            </div>
                            <div className='border p-3 flex flex-col items-center rounded-lg'>
                                <h1>Number of Users</h1>
                                <p>{userCount && userCount}</p>
                            </div>
                            <div className='border p-3 flex flex-col items-center rounded-lg'>
                                <h1>Number of Rooms</h1>
                                <p>{roomCount && roomCount}</p>
                            </div>
                            <div className='border p-3 flex flex-col items-center rounded-lg'>
                                <h1>Number of Owners</h1>
                                <p>{ownerCount && ownerCount}</p>
                            </div>
                        
                        </div>
                    </div>
                </MainAreaAdmin>
            </ContainerLayout>


        </div>
    )
}

export default Dashboard




