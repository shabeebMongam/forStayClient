import React from 'react'
import { useState } from 'react'
import { blockOwnerAdminApi, blockUserAdminApi, unBlockOwnerAdminApi, unBlockUserAdminApi } from '../../../helpers/apis/adminApis'
import { useEffect } from 'react'

const SingleOwnerAndUser = ({owner,user}) => {
    







    const [active, setActive] = useState()

    const [activeOwner, setActiveOwner] = useState()

    useEffect(()=>{
        if(owner){
            setActiveOwner(owner.verified)

            // console.log(owner);
        }
        if(user){
            setActive(user.adminApproval)

            // console.log(user);
        }
    },[])
   



    if(owner){

        console.log(owner);
        const blockOwner = async (ownerId) => {
            const response = await blockOwnerAdminApi(ownerId)
            if (response.message) {
                setActiveOwner(!activeOwner)
            }

        }
        const unBlockOwner = async (ownerId) => {
            const response = await unBlockOwnerAdminApi(ownerId)
            if (response.message) {
                setActiveOwner(!activeOwner)
            }
        }

        return (
            <tr className="border-b hover:bg-orange-100">
                <td className="p-3 px-5">{owner.name}</td>
                <td className="p-3 px-5">{owner.email}</td>
                <td>
                    {activeOwner ? (
                        <button className='border py-1 px-3 rounded-lg' onClick={() => blockOwner(owner._id)}> Block </button>
                    ) : (
                        <button className='border py-1 px-3 rounded-lg' onClick={() => unBlockOwner(owner._id)}> Unblock </button>
                    )}
                </td>
            </tr>
        )
    }

    if(user){
        const blockUser = async (userId) => {
            const response = await blockUserAdminApi(userId)
            if (response.message) {
                setActive(!active)
            }

        }
        const unBlockUser = async (userId) => {
            const response = await unBlockUserAdminApi(userId)
            if (response.message) {
                setActive(!active)
            }
        }
        return (
            <tr className="border-b hover:bg-orange-100">
                <td className="p-3 px-5">{user.name}</td>
                <td className="p-3 px-5">{user.email}</td>
                <td>
                    {active ? (
                        <button className='border py-1 px-3 rounded-lg' onClick={() => blockUser(user._id)}> Block </button>
                    ) : (
                        <button className='border py-1 px-3 rounded-lg' onClick={() => unBlockUser(user._id)}> Unblock </button>
                    )}
                </td>
            </tr>
        )
    }





 
}

export default SingleOwnerAndUser