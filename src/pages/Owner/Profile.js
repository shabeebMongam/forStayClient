import React, { useEffect, useState } from 'react'
import Header from '../../components/Owner/Header/Header'
import ContainerLayout from '../../components/Owner/BoilerPlate/ContainerLayout'
import SidebarLeftOwner from '../../components/Owner/BoilerPlate/SidebarLeftOwner'
import MainAreaOwner from '../../components/Owner/BoilerPlate/MainAreaOwner'
import  {getOwnerDataOwnerApi} from '../../helpers/apis/ownerApis'

const Profile = () => {

  const [ownerData, setOwnerData] = useState({})
  const [hotelCount, setHotelCount] = useState()

  const getUSerData = async ()=>{
    const response = await getOwnerDataOwnerApi()
    console.log(response);
    setOwnerData(response.ownerData)
    setHotelCount(response.hotelCount)

  }

  useEffect(()=>{
    getUSerData()
  },[])


  return (
    <div>
      <Header />

      <ContainerLayout>
        <SidebarLeftOwner/>
        <MainAreaOwner>
      

              




          <section class="pt-16 bg-blueGray-50">
            <div class="w-full lg:w-10/12 px-4 mx-auto">
              <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
                <div class="px-6 ">
                  <div class="flex flex-wrap justify-center ">
                    <div class="w-full px-4 flex justify-center">
                      <div class="relative">
                        {/* <img alt="..." src="https://demos.creative-tim.com/notus-js/assets/img/team-2-800x800.jpg" className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"/> */}
                        <img src="https://png.pngtree.com/png-vector/20191101/ourmid/pngtree-cartoon-color-simple-male-avatar-png-image_1934459.jpg" className='shadow-xl rounded-full h-auto  border-none max-w-150-px relative w-40' alt="" />
                      </div>
                    </div>
                   


                    <div class="text-center mt-8">
                        {ownerData ?
                        <h3 class="text-xl font-semibold leading-normal  text-blueGray-700 mb-2"> {ownerData.name} </h3>
                        : <h3 class="text-xl font-semibold leading-normal  text-blueGray-700 mb-2"> Something Wrong </h3>} 
                      
                        
                      <div class="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold  ">
                        <i class="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                        {ownerData.email}
                      </div>
                      {/* <div class="mb-2 text-blueGray-600 mt-10">
                        <i class="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
                        Solution Manager - Creative Tim Officer
                      </div>
                      <div class="mb-2 text-blueGray-600">
                        <i class="fas fa-university mr-2 text-lg text-blueGray-400"></i>
                        University of Computer Science
                      </div> */}
                    </div>
                  </div>

                  <div class="w-full px-4 text-center mt-1">
                    <div class="flex justify-center py-4 lg:pt-4 pt-8">
                      <div class="mr-4 p-3 text-center">
                        {hotelCount ? <span class="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                        {hotelCount} </span> : <span class="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                        "Something Wrong" </span> }
                        
                        <span class="text-sm text-blueGray-400">Hotels</span>
                      </div>
                      {/* <div class="mr-4 p-3 text-center">
                        <span class="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                          10
                        </span>
                        <span class="text-sm text-blueGray-400">Photos</span>
                      </div>
                      <div class="lg:mr-4 p-3 text-center">
                        <span class="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                          89
                        </span>
                        <span class="text-sm text-blueGray-400">Comments</span>
                      </div> */}
                    </div>
                  </div>
                 
                  <div class="mt-10 py-10 border-t border-blueGray-200 text-center">
                    <div class="flex flex-wrap justify-center">
                      <div class="w-full lg:w-9/12 px-4">
                        {/* <p class="mb-4 text-lg leading-relaxed text-blueGray-700">
                          An artist of considerable range, Jenna the name taken
                          by Melbourne-raised, Brooklyn-based Nick Murphy
                          writes, performs and records all of his own music,
                          giving it a warm, intimate feel with a solid groove
                          structure. An artist of considerable range.
                        </p> */}
                        {/* <a href="javascript:void(0);" class="font-normal text-pink-500">
                          Show more
                        </a> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <footer class="relative  pt-8 pb-6 mt-8">
              <div class="container mx-auto px-4">
                <div class="flex flex-wrap items-center md:justify-between justify-center">
                  <div class="w-full md:w-6/12 px-4 mx-auto text-center">
                    <div class="text-sm text-blueGray-500 font-semibold py-1">
                      {/* Made with <a href="https://www.creative-tim.com/product/notus-js" class="text-blueGray-500 hover:text-gray-800" target="_blank">Notus JS</a> by <a href="https://www.creative-tim.com" class="text-blueGray-500 hover:text-blueGray-800" target="_blank"> Creative Tim</a>. */}
                    </div>
                  </div>
                </div>
              </div>
            </footer>
          </section>



        </MainAreaOwner>
      </ContainerLayout>
    </div>
  )
}

export default Profile