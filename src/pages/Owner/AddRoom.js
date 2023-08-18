import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import Loading from '../../components/Common/Loader/Loading'
import FormToAddRoom from '../../components/Owner/AddRoom/FormToAddRoom'
import ContainerLayout from '../../components/Owner/BoilerPlate/ContainerLayout'
import MainAreaOwner from '../../components/Owner/BoilerPlate/MainAreaOwner'
import SidebarLeftOwner from '../../components/Owner/BoilerPlate/SidebarLeftOwner'
import Header from '../../components/Owner/Header/Header'
import OwnerLoading from '../../components/Owner/Loading/OwnerLoading'

const AddRoom = () => {


    // const [loading, setLoading] = useState(false)

    const { userLoadingStatus } = useSelector((state) => state.userLoading)
    const { hotelId } = useParams()
    console.log(hotelId);
    return (
        <div>
            
                    <>
                        <Header />
                            {userLoadingStatus && <Loading />}
                        <ContainerLayout>
                            <SidebarLeftOwner />
                            <MainAreaOwner>
                                <div className=' w-3/4 mx-auto flex flex-col  h-full  justify-center mt-10'>
                                        <div className='flex justify-between'>

                                        <h2 className='mb-20 text-4xl text-gray-900 font-medium underline'>Add Room</h2>
                                        <div className=''>
                                                <Link to={"/owner/hotels"} >    <button className='border px-5 mr-2 rounded-md bg-slate-400'  >Back To Hotels</button> </Link>
                                                <Link to={`/owner/showRooms/${hotelId}`} >     <button className='border px-5 rounded-md bg-blue-300' >Show Rooms</button> </Link>
                                        </div>
                                    </div>

                                    <FormToAddRoom />
                                </div>
                            </MainAreaOwner>
                        </ContainerLayout>
                    </>

        </div>
    )
}

export default AddRoom