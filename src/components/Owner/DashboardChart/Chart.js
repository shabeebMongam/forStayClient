import { useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { byMonthsOwnerApi, getAllBookingsOwnerApi } from '../../../helpers/apis/ownerApis';
import { useState } from 'react';

const Chart = () => {
    const [thedatas,setTheDatas] = useState( [])
    // const [bookings, setBookings] = useState()

    useEffect(() => {
        // const getAllOwners = async () => {
        //     const response = await getAllBookingsOwnerApi()
        //     // setBookings(response)
        // }
        const bookingByMonths = async()=>{
            const response = await byMonthsOwnerApi()
            console.log(response);
            setTheDatas(response)
        }

        // getAllOwners()
        bookingByMonths()
    }, [])

    // if(bookings){
    //     bookings.forEach((data)=>{
    //         return(
    //             datas.push({name:"April",})
    //         )
    //     })
    // }

  return (
      <BarChart width={1200} height={300} data={thedatas}>
          <XAxis dataKey="name" stroke="#8884d8" />
          <YAxis />
          <Tooltip wrapperStyle={{ width: 100, backgroundColor: '#ccc' }} />
          {/* <Legend width={100} wrapperStyle={{ top: 40, right: 20, backgroundColor: '#f5f5f5', border: '1px solid #d5d5d5', borderRadius: 3, lineHeight: '40px' }} /> */}
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <Bar dataKey="bookingCount" fill="#8884d8" barSize={30} />
      </BarChart>
  )
}

export default Chart