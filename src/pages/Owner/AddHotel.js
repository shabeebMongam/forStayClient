import React from 'react'
import { useSelector } from 'react-redux'
import FormToAddHotel from '../../components/Owner/AddHotel/FormToAddHotel'
import ContainerLayout from '../../components/Owner/BoilerPlate/ContainerLayout'
import MainAreaOwner from '../../components/Owner/BoilerPlate/MainAreaOwner'
import SidebarLeftOwner from '../../components/Owner/BoilerPlate/SidebarLeftOwner'
import Header from '../../components/Owner/Header/Header'
import Loading from '../../components/Common/Loader/Loading'



const AddHotel = () => {


  const { userLoadingStatus } = useSelector((state) => state.userLoading)

  return (
    <div>
    {
      <>
      {userLoadingStatus && <Loading />}
              <Header />

              <ContainerLayout>
                <SidebarLeftOwner />
                <MainAreaOwner>
                  <div className=' w-3/4 mx-auto flex flex-col  h-full  justify-center'>

                    <h2 className='mb-20 mt-5 text-4xl text-gray-900 font-medium underline'>Add Hotel</h2>

                    <FormToAddHotel />
                  </div>
                </MainAreaOwner>
              </ContainerLayout>
      </>
      
    } 

    </div>
  )
}

export default AddHotel