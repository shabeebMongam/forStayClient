import React, { useEffect, useState } from 'react'
import ContainerLayout from '../../components/Owner/BoilerPlate/ContainerLayout'
import MainAreaOwner from '../../components/Owner/BoilerPlate/MainAreaOwner'
import SidebarLeftOwner from '../../components/Owner/BoilerPlate/SidebarLeftOwner'
import Header from '../../components/Owner/Header/Header'
import OwnerLoading from '../../components/Owner/Loading/OwnerLoading'
import { useSelector } from 'react-redux'
import FormToEditHotel from '../../components/Owner/EditHotel/FormToEditHotel'
import { useParams } from 'react-router-dom'
import { editHotelGetOwnerApi } from '../../helpers/apis/ownerApis'

const EditHotel = () => {
    const { userLoadingStatus } = useSelector((state) => state.userLoading)


    

   


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
                              <div className=' w-3/4 mx-auto flex flex-col  h-full  justify-center'>

                                  <h2 className='mb-20 text-4xl text-gray-900 font-medium underline'>Edit Hotel</h2>

                                  <FormToEditHotel />
                              </div>
                          </MainAreaOwner>
                      </ContainerLayout>
                  </>
              )
          }







      </div>
  )
}

export default EditHotel