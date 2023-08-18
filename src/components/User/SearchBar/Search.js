import { faBed, faCalendarDays } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useState } from 'react';
import { DateRange } from 'react-date-range';
import { useNavigate } from 'react-router-dom';


const Search = () => {
    const [openDate, setOpenDate] = useState(false);
    const [date, setDate] = useState([
        {
            startDate: new Date(),
            endDate: null,
            key: 'selection'
        }
    ]);
    const navigate = useNavigate()
    const [placeSearch, setPlaceSearch] = useState()

    const addDay = (date, number)=>{
        const addedDate = date
        addedDate.setDate(addedDate.getDate()+number)
        return addedDate
    }


    const handleChange = (data) => {
        setPlaceSearch(data)

    }
    const searchWithPlaceAndDate = () => {
        if (openDate) {
            setOpenDate(false)
        }


        const endDate = date[0].endDate
        const startDate = date[0].startDate


        navigate(`/hotels`, { state: { place: placeSearch, start: startDate, end: endDate } })



    }
    




    return (
        <div className='flex-col flex  md:flex-row justify-center  p-2 rounded-lg w-3/4 mx-auto  py-5 ' style={{ backgroundColor:"#54B435 "}} >
            <div className='border  rounded-lg mx-5 bg-white'>
                <FontAwesomeIcon icon={faBed} className="headerIcon ml-3" />
                <input onChange={(e) => handleChange(e.target.value)} type="text" placeholder='Place' className='ml-3 rounded-lg border-none border-transparent focus:border-transparent focus:ring-0' />
            </div>
            <div className='border  rounded-lg mt-2 mx-5 md:mt-0 relative  bg-white' >
                <FontAwesomeIcon icon={faCalendarDays} className="headerIcon ml-3" onClick={() => setOpenDate(!openDate)} />
                {openDate && (
                    <DateRange
                        editableDateInputs={true}
                        onChange={(item) => setDate([item.selection])}
                        moveRangeOnFirstSelection={false}
                        ranges={date}
                        className="absolute top-10 z-10"
                        minDate={new Date()}
                    />
                )}
                <input  onClick={() => setOpenDate(!openDate)}  type="text" placeholder="Check In     Check Out"  className='ml-3 rounded-lg  border-none border-transparent focus:border-transparent focus:ring-0' />
            </div>
            {/* <div className='border  rounded-lg mt-2 mx-5 md:mt-0 relative  bg-white' >
                <FontAwesomeIcon icon={faCalendarDays} className="headerIcon ml-3" onClick={() => setOpenDate(!openDate)} />
                {openDate && (
                    <DateRange
                        editableDateInputs={true}
                        onChange={(item) => setDate([item.selection])}
                        moveRangeOnFirstSelection={false}
                        ranges={date}
                        className="absolute top-10 z-10"
                        minDate={new Date()}
                    />
                )}
                <input onClick={() => setOpenDate(!openDate)} type="text" placeholder='Check Out' className='ml-3 rounded-lg  border-none border-transparent focus:border-transparent focus:ring-0' />
            </div> */}
            <div className='my-auto flex  rounded-lg justify-end mx-5 mt-2 md:mt-0' style={{ backgroundColor:"#54B435"}} >
                <button className=' border-2 transition transform duration-1000 hover:bg-white hover:text-gray-500  rounded-lg px-6 py-2 text-white font-semibold ' onClick={searchWithPlaceAndDate}>SEARCH</button>
            </div>
        </div>
    )
}

export default Search