import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import ContainerLayout from '../../components/Owner/BoilerPlate/ContainerLayout';
import MainAreaOwner from '../../components/Owner/BoilerPlate/MainAreaOwner';
import SidebarLeftOwner from '../../components/Owner/BoilerPlate/SidebarLeftOwner';
import Header from '../../components/Owner/Header/Header';
import OwnerLoading from '../../components/Owner/Loading/OwnerLoading';
import ShowRoomTable from '../../components/Owner/ShowRoom/ShowRoomTable';
import { getRoomDataOwnerApi } from '../../helpers/apis/ownerApis';

const ShowRooms = () => {
  const { userLoadingStatus } = useSelector((state) => state.userLoading)

  const { hotelId } = useParams()

  const [hotel, setMyHotel] = useState()
  const [room, setRoom] = useState([])


  const getRoomData = async () => {
    const response = await getRoomDataOwnerApi(hotelId)
    console.log(response);
    setRoom(response.rooms)
    setMyHotel(response.hotelDetailes)

  }

  const roomRemoved = (deletedId) =>{
    console.log("Evide");
      setRoom((prev)=>{
        return prev.filter((room)=>room._id !== deletedId)
      })
  }


  useEffect(() => {
    getRoomData()
  }, [])


  return (
    <div>
      {
        userLoadingStatus ? (
          <OwnerLoading />

        ) : (
          <>
            <Header />

            <ContainerLayout>
              <SidebarLeftOwner />
              <MainAreaOwner>
                <div className=' w-full mx-auto flex flex-col  h-full  justify-center mt-10'>
                  <div className='flex justify-between  px-10'>

                    <h2 className='mb-10 text-4xl text-gray-900 font-medium underline'> All Rooms</h2>
                    <div className=''>
                      <Link to={"/owner/hotels"} >    <button className='border px-5  rounded-md bg-slate-400'  >Back To Hotels</button> </Link>
                      {/* <Link to={`/owner/showRooms/${hotelId}`} >     <button className='border px-5 rounded-md bg-blue-300' >Show Rooms</button> </Link> */}
                    </div>
                  </div>
                    {hotel ? <div className=' px-10'>
                        <h1>Hotel Name : {hotel.name} </h1>
                      <h1>Location : {hotel.district} {hotel.city} </h1>
                      </div>
                    :"" }
                
                    <ShowRoomTable room={room} toRemoveRoom={roomRemoved} />

                </div>
              </MainAreaOwner>
            </ContainerLayout>
          </>
        )
      }
    </div>
  )
}

export default ShowRooms