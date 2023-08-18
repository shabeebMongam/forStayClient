import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { DateRange } from 'react-date-range';
import { format } from "date-fns";  
import Header from '../../../components/User/Header/Header';
import SearchItem from '../../../components/User/Dummy/searchItem/SearchItem';


import './List.css'
import { getHotelsByDistrict, getHotelsUserApi } from '../../../helpers/apis/userApis';





const HotelList = () => {

    const [allHotels,setAllHotels] = useState([])
    const [searchValue,setSearchValue] = useState("")
    const [district,setDistrict] = useState()
    const [city,setCity] = useState()
    const location = useLocation()

    const getHotelData = async ()=>{
        const getHotels = await getHotelsUserApi(location.state)
        setAllHotels(getHotels)
        setSearchValue("")
        console.log(getHotels);

       const districtNames = getHotels.map((name)=>{
        return (
            name.district
        )
       })
       const cityNames = getHotels.map((name)=>{
        return (
            name.district
        )
       })

       setCity(cityNames)
       setDistrict(districtNames)


    }

    useEffect(()=>{
        console.log(location.state);
        getHotelData()
    },[])

    // const location = useLocation()

    // console.log(location);
    // const [destination, setDestination] = useState(location.state.destination);
    // const [date, setDate] = useState(location.state.date);
    const [openDate, setOpenDate] = useState(false);
    // const [options, setOptions] = useState(location.state.options);

    const searchValueChange = (event)=>{
        setSearchValue(event.target.value)
    }

    const toSearch = async (theSearchValue)=>{
        setSearchValue(theSearchValue)

        const response = await getHotelsByDistrict(theSearchValue) 
        console.log(response);

        setAllHotels(response)

        console.log(allHotels);
    }

    return (
        <div>
            <Header/>

            <div className='listContainer'>
                <div className='listWrapper container flex flex-col md:flex-row'>

                    <div className='md:hidden'>
                        <div className='lsItem w-1/2 mx-auto'>
                            <div className='flex justify-between'>
                            <label htmlFor="" >Destination</label>
                                <label htmlFor="" onClick={getHotelData}>All</label>

                            </div>
                            <input type="text" value={searchValue} className='border border-red-100' onChange={searchValueChange} />
                        </div>
                        {
                            (allHotels && city && district) &&
                            <div className='forDropDown w-1/2 mx-auto'>
                                {
                                    district.filter(item => {
                                        const searchTerm = searchValue
                                        const fullName = item.toLowerCase()
                                        return searchTerm && fullName.startsWith(searchTerm) && fullName !== searchTerm
                                    }).slice(0, 5).map((item) => {
                                        return (
                                            <div onClick={() => toSearch(item)} className='forDropDownRow' key={item} >
                                                {item}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        }
                    </div>
                   
                    <div className='listResult '>
                        {allHotels.length>0 ? allHotels.map((hotel) => <SearchItem key={hotel._id} hotelData={hotel} />) : <div> <h1> No Date to display</h1> </div>}
                    </div>

                    

                    <div className='listSearch hidden md:block'>
                        <div className='flex justify-between'>
                        <h1 className='lsTitle'>Search</h1>
                            <button className='border px-2 py-1 rounded-lg' onClick={getHotelData}>Show All</button>
                        </div>
                        <div className='lsItem'>
                            <label htmlFor="">Destination</label>
                            <input type="text" value={searchValue} onChange={searchValueChange}  />
                        </div>
                        {
                            
                            (allHotels && city && district) &&
                            <div className='forDropDown absolute'>
                                {
                                    district.filter(item => {
                                        const searchTerm = searchValue
                                        const fullName = item.toLowerCase()
                                        return searchTerm && fullName.startsWith(searchTerm) && fullName !== searchTerm
                                    }).slice(0,5).map((item) => {
                                        return(
                                        <div onClick={()=>toSearch(item)} className='forDropDownRow' key={item} >
                                            {item}
                                        </div>
                                        )
                                    })

                                    // allHotels.filter(item=>{
                                    //     return(

                                    //         console.log(item)
                                    //     )
                                    // })
                                    
                                    }
                            </div>
                        }
                    </div>

                </div>
            </div>
        </div>

    )
}

export default HotelList

