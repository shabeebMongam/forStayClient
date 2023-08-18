import React, { useState } from 'react'
import { blockHotelAdminApi, unBlockHotelAdminApi } from '../../../helpers/apis/adminApis'

const HotelBlockUnblock = ({hotel}) => {
    const [active, setActive] = useState(hotel.adminApproval)

    const blockHotel = async (hotelId) => {
        
        const response = await blockHotelAdminApi(hotelId)
        if (response.message) {
            setActive(!active)
        }

    }
    const unBlockHotel = async (hotelId) => {
        const response = await unBlockHotelAdminApi(hotelId)
        if (response.message) {
            setActive(!active)
        }
    }
    return (
        <tr className="border-b hover:bg-orange-100">
            <td className="p-3 px-5"> <h2> {hotel.name} </h2> <h3> {hotel.district},{hotel.city} </h3></td>
            <td className="p-3 px-5">{hotel.ownerId.name}</td>
            <td>
                {active ? (
                    <button className='border py-1 px-3 rounded-lg' onClick={() => blockHotel(hotel._id)}> Block </button>
                ) : (
                    <button className='border py-1 px-3 rounded-lg' onClick={() => unBlockHotel(hotel._id)}> Unblock </button>
                )}
            </td>
        </tr>
    )
}

export default HotelBlockUnblock