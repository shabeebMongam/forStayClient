import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../../components/Owner/Header/Header'
import ContainerLayout from '../../components/Owner/BoilerPlate/ContainerLayout'
import SidebarLeftOwner from '../../components/Owner/BoilerPlate/SidebarLeftOwner'
import MainAreaOwner from '../../components/Owner/BoilerPlate/MainAreaOwner'
import { bookingPendingOwnerApi, deleteHotelOwnerApi, editHotelGetOwnerApi, getmyHotelsOwnerApi } from '../../helpers/apis/ownerApis'
import { ownerApi } from '../../helpers/apis/ApiSetup'
import ReactPaginate from 'react-paginate'
import Pagination from '../../components/Owner/Pagination/Pagination'
import DeleteHotelModal from '../../components/Owner/DeleteHotelModal/DeleteHotelModal'

const Hotels = () => {

  const [myHotels, setMyHotels] = useState([])
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState();
  const [total, setTotal] = useState();

  const [openModal, setOpenModal] = useState(false);
  const [hotelId, setHotelId] = useState()

  

  useEffect(() => {
    const getHotels = async () => {
      const response = await getmyHotelsOwnerApi(page)
      console.log(response);


      setMyHotels(response.myHotels)
      setLimit(response.limit)
      setTotal(response.total)
      // console.log(myHotels);

    }
    getHotels()


  }, [page,limit,total])


  const deleteHotel = async () => {
    setOpenModal(false)

    const response = await deleteHotelOwnerApi(hotelId)
    const removedHotelId = response.hotelId
    console.log(removedHotelId);

    setMyHotels((prev) => {
      return prev.filter((hotel) => hotel._id !== removedHotelId)
    })
    // console.log(response);

  }


  // const deleteHotel = async () => {
  //   setOpenModal(false)

  //   const response = await deleteRoomOwnerApi(roomId)
  //   notify("dasdasda")

  //   toRemoveRoom(roomId)
  //   console.log(response);
  // }



  const  deleteHotelModal = (hotelId)=>{
    setHotelId(hotelId)
    setOpenModal(true);
  }



  return (
    <div>
      <Header />

      <ContainerLayout>
        <SidebarLeftOwner />
        <MainAreaOwner>
          <div className='m-2 ' >
            {openModal && <DeleteHotelModal closeModal={setOpenModal} delHotel={deleteHotel} />}
            <div className='flex justify-between my-10'>
              <h1 className=' text-4xl text-gray-900 font-medium '>Hotels</h1>
              <div>
                <Link to='/owner/bookings' >
                  <button className='border px-4  py-1 rounded-md bg-cyan-600 ' >Bookings</button>
                </Link>
                <Link to='/owner/addHotel' >
                  <button className='border px-4  py-1 rounded-md bg-cyan-600 ml-5'>Add Hotel</button>
                </Link>

              </div>
            </div>








            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              {myHotels.length > 0 ?
                <>
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 border">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
                      <tr className='bg-slate-400 text-black font-black text-base'>

                        <th scope="col" className="px-6 py-3">
                          Hotel name
                        </th>
                        {/* <th scope="col" className="px-1 py-3">
                        Bookings
                      </th> */}
                        <th scope="col" className="px-6 py-3">
                          Location
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Rooms
                        </th>



                        <th scope="col" className="px-6 py-3">
                          Actions
                        </th>

                      </tr>
                    </thead>
                    <tbody>

                      {myHotels ? myHotels.map((hotel) => {
                        return (
                          <tr key={hotel._id} className="bg-white border-b  text-black hover:bg-gray-300 ">
                            <th scope="row" className="px-6 py-4 font-medium text-black whitespace-nowrap ">
                              {hotel.name}
                            </th>
                            {/* <th scope="row" className="px-1 py-4 font-medium text-black whitespace-nowrap ">
                            {
                              pending.length>0
                            }
                            <Link> <button className='border px-3 py-1 rounded-lg'>In Queue</button> </Link>
                            
                          </th> */}
                            <td className="px-6 py-4">
                              {hotel.district}, {hotel.city}
                            </td>
                            <td className="px-6 py-4">
                              {hotel.adminApproval ? <p className='text-green-600'>Approved</p> : <p className='text-red-700'>Pending</p>}
                            </td>
                            <td className="px-6 py-4 ">
                              {hotel.adminApproval ? <div className=' '>
                                {/* <p className='font-semibold mb-2' >Total Rooms : 2  </p> */}
                                <div className=' w-1/2'>
                                  <Link to={`/owner/addRoom/${hotel._id}`} >  <button className=' border px-3 py-0.5 rounded-md bg-green-700 w-full'> Add Room</button> </Link>
                                  <div className='mt-2'>
                                    <Link to={`/owner/showRooms/${hotel._id}`} >  <button className=' border px-3 py-0.5 rounded-md bg-blue-300 w-full'>Show Rooms</button> </Link>

                                  </div>
                                </div>
                              </div> : <p className='text-red-700'>Approval Pending</p>}
                            </td>
                            <td className="px-6 py-4 ">

                              <div className=' w-1/2 flex flex-col'>
                                <Link to={`/owner/editHotel/${hotel._id}`} >  <button className='mb-3 border px-3 py-0.5 rounded-md bg-yellow-500 w-full' >Edit</button></Link>
                                <button className=' border px-3 py-0.5 rounded-md bg-red-500' onClick={() => deleteHotelModal(hotel._id)}>Delete</button>
                              </div>
                            </td>

                          </tr>
                        )
                      }) : "No Hotels"}

                    </tbody>
                  </table>
                  
                </>
                : <div className='flex justify-center items-center'>  No Hotels To Display </div>}

                      <div>

              <Pagination page={page} limit={limit&&limit} total={total&&total} setPage={(page) => { setPage(page) }} />
                      </div>
            </div>
          </div>



        </MainAreaOwner>
      </ContainerLayout>





    </div>
  )
}

export default Hotels