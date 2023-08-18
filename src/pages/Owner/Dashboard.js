import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BoilerPlate from '../../components/Owner/BoilerPlate/ContainerLayout'
import BoilerPlateLeft from '../../components/Owner/BoilerPlate/SidebarLeftOwner'
import BoilerPlateRight from '../../components/Owner/BoilerPlate/MainAreaOwner'
import Header from '../../components/Owner/Header/Header'
import ContainerLayout from '../../components/Owner/BoilerPlate/ContainerLayout'
import SidebarLeftOwner from '../../components/Owner/BoilerPlate/SidebarLeftOwner'
import MainAreaOwner from '../../components/Owner/BoilerPlate/MainAreaOwner'
import { getDashboardDataOwnerApi } from '../../helpers/apis/ownerApis'
import Chart from '../../components/Owner/DashboardChart/Chart'

const Dashboard = () => {

  const navigate = useNavigate()

  const [hotelCount,setHotelCount] = useState()


  useEffect(() => {
    const dashboardData = async () => {
      const response = await getDashboardDataOwnerApi()
      console.log(response);
      setHotelCount(response)
    }
    dashboardData()
  })





  return (


    <div>
      <Header />

      <ContainerLayout>
        <SidebarLeftOwner />
        <MainAreaOwner>
          <div className='flex flex-col  h-screen my-10 justify-center' >
            <div className='flex justify-evenly  w-full'>

              <div className='px-3 flex flex-col  '>
                <div className='border p-3 flex flex-col items-center rounded-lg'>
                  <h1>Number of Hotels</h1>
                  <p>{hotelCount&& hotelCount}</p>
                </div>
              </div>


              {/* <div className='px-3 flex flex-col items-center  '>
                <div className='border p-3 flex flex-col items-center'>
                  <h1>Pending Bookings</h1>
                  <p>2</p>
                </div>
              </div> */}


              {/* <div className='px-3 flex flex-col items-center  '>
                <div className='border p-3 flex flex-col items-center'>
                  <h1>Completed Bookings</h1>
                  <p>2</p>
                </div>
              </div> */}




            </div>

            <div className='flex  w-full justify-center mt-20'>
              <Chart />
            </div>


          </div>
        </MainAreaOwner>
      </ContainerLayout>






    </div>
  )
}

export default Dashboard