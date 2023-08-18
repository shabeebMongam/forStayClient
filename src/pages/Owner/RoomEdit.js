import React from 'react'
import ContainerLayout from '../../components/Owner/BoilerPlate/ContainerLayout'
import MainAreaOwner from '../../components/Owner/BoilerPlate/MainAreaOwner'
import SidebarLeftOwner from '../../components/Owner/BoilerPlate/SidebarLeftOwner'
import EditRoomForm from '../../components/Owner/EditRoom/EditRoomForm'
import Header from '../../components/Owner/Header/Header'

const RoomEdit = () => {
  return (
    <div>
          <Header />

          <ContainerLayout>
              <SidebarLeftOwner />
              <MainAreaOwner>
                  <div className=' w-3/4 mx-auto flex flex-col  h-full  justify-center'>

                      <h2 className='mb-20 text-4xl text-gray-900 font-medium underline'>Edit Room</h2>

                  <EditRoomForm/>
                  </div>
              </MainAreaOwner>
          </ContainerLayout>
    </div>
  )
}

export default RoomEdit