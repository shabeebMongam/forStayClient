import React from 'react'
import ContainerLayout from '../../components/Owner/BoilerPlate/ContainerLayout'
import Header from '../../components/Owner/Header/Header'
import SidebarLeftOwner from '../../components/Owner/BoilerPlate/SidebarLeftOwner'
import MainAreaOwner from '../../components/Owner/BoilerPlate/MainAreaOwner'
import { useState } from 'react'
import { useEffect } from 'react'
import { getAllBookingsOwnerApi } from '../../helpers/apis/ownerApis'
import { useNavigate } from 'react-router-dom'

const AllBookings = () => {
    const [bookings, setBookings] = useState()
    const navigate = useNavigate()



    useEffect(() => {
        const getAllOwners = async () => {
            const response = await getAllBookingsOwnerApi()
            if(response.logHimOut){
                localStorage.removeItem("ownerName")
                localStorage.removeItem("ownerToken")
                navigate('/owner/login')
            }
            console.log(response);
            setBookings(response)
        }

        getAllOwners()
    }, [])

    function addingZero(date) {
        let dateParts = date.split("/"); // split the date part into month, day, and year
        let month = dateParts[0].padStart(2, "0"); // add leading zero to month
        let day = dateParts[1].padStart(2, "0"); // add leading zero to day
        let year = dateParts[2];
        let formattedDate = `${day}/${month}/${year}`; // combine the formatted date and time parts
        return formattedDate;
    }

  return (
      <div>
          <Header />

          <ContainerLayout>
              <SidebarLeftOwner />
              <MainAreaOwner>
                 <div className="text-gray-900 bg-gray-200">
                  <div className="p-4 flex">
                      <h1 className="text-3xl">
                          Owners
                      </h1>
                  </div>
                  {bookings && <div className="px-3 py-4 flex justify-center">
                      <table className="w-full text-md bg-white shadow-md rounded mb-4">
                          <tbody>
                              <tr className="border-b">
                                  <th className="text-left p-3 px-5">Hotel</th>
                                  <th className="text-left p-3 px-5">Room Number</th>
                                  <th className="text-left p-3 px-5"> Client </th>
                                  <th className="text-left p-3 px-5"> Check In </th>
                                  <th className="text-left p-3 px-5"> Check Out </th>

                              </tr>
                              {bookings.map((data) => {
                                  return (
                                      <tr className="border-b hover:bg-orange-100">
                                          <td className="p-3 px-5">{data.hotelId.name}</td>
                                          <td className="p-3 px-5">{data.roomId.roomNumber}</td>
                                          <td className="p-3 px-5">{data.name}</td>
                                          <td className="p-3 px-5">{data.startDate.split("T",1)}</td>
                                          <td className="p-3 px-5">{data.endDate.split("T", 1)}</td>
                                             
                                      </tr>

                                  )
                              })}

                          </tbody>
                      </table>
                  </div>}
              </div>
              </MainAreaOwner>
          </ContainerLayout>






      </div>
  )
}

export default AllBookings