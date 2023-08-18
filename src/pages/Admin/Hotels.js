import React from 'react'
import Header from '../../components/Admin/Header/Header'
import ContainerLayout from '../../components/Admin/BoilerPlate/ContainerLayout'
import SidebarLeftAdmin from '../../components/Admin/BoilerPlate/SidebarLeftAdmin'
import MainAreaAdmin from '../../components/Admin/BoilerPlate/MainAreaAdmin'
import { useState } from 'react'
import { useEffect } from 'react'
import { getAllHotelsAdminApi } from '../../helpers/apis/adminApis'
import HotelBlockUnblock from '../../components/Admin/HotelBlockUnblock/HotelBlockUnblock'

const Hotels = () => {
    const [hotels, setHotels] = useState()



    useEffect(() => {
        const getAllHotels = async () => {
            const response = await getAllHotelsAdminApi()
            console.log(response);
            setHotels(response)
        }

        getAllHotels()
    }, [])
  return (
      <div>
          <Header />
          <ContainerLayout>
              <SidebarLeftAdmin />
              <MainAreaAdmin>
                  <div className="text-gray-900 bg-gray-200">
                      <div className="p-4 flex">
                          <h1 className="text-3xl">
                              Hotels
                          </h1>
                      </div>
                      {hotels && <div className="px-3 py-4 flex justify-center">
                          <table className="w-full text-md bg-white shadow-md rounded mb-4">
                              <tbody>
                                  <tr className="border-b">
                                      <th className="text-left p-3 px-5">Name</th>
                                      <th className="text-left p-3 px-5">Owner</th>

                                      <th className="text-left p-3 px-5"> Action </th>
                                  </tr>
                                  {hotels.map((hotel) => {
                                      return (
                                          <HotelBlockUnblock hotel={hotel} />

                                      )
                                  })}

                              </tbody>
                          </table>
                      </div>}
                  </div>

              </MainAreaAdmin>

          </ContainerLayout>
      </div>
  )
}

export default Hotels