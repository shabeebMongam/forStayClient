import React, { useEffect, useState } from 'react'
import Header from '../../components/Admin/Header/Header'
import ContainerLayout from '../../components/Admin/BoilerPlate/ContainerLayout'
import SidebarLeftAdmin from '../../components/Admin/BoilerPlate/SidebarLeftAdmin'
import MainAreaAdmin from '../../components/Admin/BoilerPlate/MainAreaAdmin'
import { getAllOwnersAdminApi } from '../../helpers/apis/adminApis'
// import OwnerBlockUnblock from '../../components/Admin/OwnerBlockUnBlock/OwnerBlockUnblock'
import ListOwnerAndUser from '../../components/Admin/ListOwnerAndUser/ListOwnerAndUser'

const Owners = () => {
    const [owners, setOwners] = useState()



    useEffect(() => {
        const getAllOwners = async () => {
            const response = await getAllOwnersAdminApi()
            console.log(response);
            setOwners(response)
        }

        getAllOwners()
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
                                Owners
                            </h1>
                        </div>
                        {owners && <div className="px-3 py-4 flex justify-center">
                            {/* <table className="w-full text-md bg-white shadow-md rounded mb-4">
                                <thead>
                                    <tr className="border-b">
                                        <th className="text-left p-3 px-5">Name</th>
                                        <th className="text-left p-3 px-5">Email</th>

                                        <th className="text-left p-3 px-5"> Action </th>
                                    </tr>   
                                </thead>
                                <tbody>

                                    {owners.map((owner) => {
                                        return (
                                            <OwnerBlockUnblock owner={owner} />

                                        )
                                    })}

                                </tbody>
                            </table> */}

                            <ListOwnerAndUser owners={owners} />
                        </div>}
                    </div>

                </MainAreaAdmin>

            </ContainerLayout>
        </div>
    )
}

export default Owners