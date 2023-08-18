import React, { useEffect, useState } from 'react'
import Header from '../../components/Admin/Header/Header'
import ContainerLayout from '../../components/Admin/BoilerPlate/ContainerLayout'
import SidebarLeftAdmin from '../../components/Admin/BoilerPlate/SidebarLeftAdmin'
import MainAreaAdmin from '../../components/Admin/BoilerPlate/MainAreaAdmin'
import { getAllUsersAdminApi,  } from '../../helpers/apis/adminApis'
// import BlockUnblock from '../../components/Admin/UserBlockingUnblocking/BlockUnblock'
import ListOwnerAndUser from '../../components/Admin/ListOwnerAndUser/ListOwnerAndUser'

const Users = () => {

    const [users, setUsers] = useState()

   

    useEffect(()=>{
       const getAllUsers = async ()=>{
        const response = await getAllUsersAdminApi()
        console.log(response);
        setUsers(response)
       }

       getAllUsers()
    },[])


   



  return (
    <div>
          <Header />
          <ContainerLayout> 
              <SidebarLeftAdmin />
              <MainAreaAdmin> 
                  <div className="text-gray-900 bg-gray-200">
                      <div className="p-4 flex">
                          <h1 className="text-3xl">
                              Users
                          </h1>
                      </div>
                      {users && <div className="px-3 py-4 flex justify-center">
                          {/* <table className="w-full text-md bg-white shadow-md rounded mb-4">
                              <tbody>
                                  <tr className="border-b">
                                      <th className="text-left p-3 px-5">Name</th>
                                      <th className="text-left p-3 px-5">Email</th>
                                      
                                      <th className="text-left p-3 px-5"> Action </th>
                                  </tr>
                                  { users.map((user)=>{
                                    return(
                                        <BlockUnblock user={user}/>

                                    )
                                  }) }
                                  
                              </tbody>
                          </table> */}

                          <ListOwnerAndUser users={users} />

                      </div> }   
                  </div>

              </MainAreaAdmin>

          </ContainerLayout>
    </div>
  )
}

export default Users