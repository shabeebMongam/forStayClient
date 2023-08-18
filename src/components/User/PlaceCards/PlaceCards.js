import React from 'react'
import { useEffect } from 'react'
import { hotelDistAndCountUserApi } from '../../../helpers/apis/userApis'

const PlaceCards = () => {

    useEffect(()=>{
        const hotelWithDistAndCount = async ()=>{
            const response = await hotelDistAndCountUserApi()
        }

        hotelWithDistAndCount()
    })
  return (
    <div>
        <div className='flex flex-col md:flex-row mx-10 md:mx-0 justify-evenly flex-wrap' >
                <div className='relative overflow-hidden h-60 rounded-lg mb-2 '>
                  <img className='w-full h-full object-cover' src="https://cf.bstatic.com/xdata/images/city/max500/957801.webp?k=a969e39bcd40cdcc21786ba92826063e3cb09bf307bcfeac2aa392b838e9b7a5&o=" alt="" />
                  <h3 className='absolute bottom-5 left-3 text-white'>Wayanad</h3>    
                  <p className='absolute bottom-1 left-3 text-white'>20 Properties</p>
                </div>
                
                
        </div>
    </div>
  )
}

export default PlaceCards