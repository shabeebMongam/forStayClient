import React, { useState } from 'react'
import './Main.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBed,
    faCalendarDays,
    faCar,
    faPerson,
    faPlane,
    faTaxi,
} from "@fortawesome/free-solid-svg-icons";
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { format } from "date-fns";
import { Link, useNavigate } from 'react-router-dom';
import { placeSearchUserApi } from '../../../../helpers/apis/userApis';
import Slider from '../../HeroCarousel/Slider';


const Main = ({ type }) => {

    const navigate = useNavigate()
    const [placeSearch, setPlaceSearch] = useState()
    const [date, setDate] = useState([
        {
            startDate: new Date(),
            endDate: null,
            key: 'selection'
        }
    ]);
    const slides = [
       "https://res.cloudinary.com/shabeebimagecloud/image/upload/v1680677199/Slider/2_ftsj8f.png",
        "https://res.cloudinary.com/shabeebimagecloud/image/upload/v1680677199/Slider/3_oyn3w5.png",
        "https://res.cloudinary.com/shabeebimagecloud/image/upload/v1680677198/Slider/1_ijrapr.png",
    ]
    const [openDate, setOpenDate] = useState(false);
   

    const handleChange =  (data) => {
        // console.log(data);
        setPlaceSearch(data)
        console.log(placeSearch);

    }

   const  searchWithPlaceAndDate = ()=>{
       if (openDate){
        setOpenDate(false)
       }
    console.log("dssd");    
    console.log(placeSearch);
    console.log(date[0]);

       const response = placeSearchUserApi({placeSearch:placeSearch ,dates: date[0]})

    //    navigate(`/getHotels?place=${placeSearch}&start=${date[0].startDate}&end=${date[0].endDate}`)


       navigate(`/hotels`, { state: { place: placeSearch, start: date[0].startDate, end:date[0].endDate }})



}
  

    return (
        <div className="header">
           <div className='hidden lg:block'>
            <Slider>
                {
                       [...slides.map((slide, i) => {
                            return(
                                <img src={slide} alt='a' />
                            )
                        })]
                }
            </Slider>
           </div>

           <div className='h-20 lg:hidden'>

           </div>


            <div className='headerContainer ' >
                 {/* <div className="headerList">
                    <div className="headerListItem active">
                        <FontAwesomeIcon icon={faBed} />
                        <span><Link to="/hotels">  Stays </Link></span>
                    </div>
                </div>  */}
                <div className='headerSearch '>
                   
                    <div className='flex     w-2/3 justify-around '>
                            <div className='headerSearchItem'>
                                <FontAwesomeIcon icon={faBed} className="headerIcon" />
                                <input
                                    type="text"
                                    placeholder="Where are you going?"
                                    className="headerSearchInput"
                                    onChange={(e) => handleChange(e.target.value)}
                                // onChange={(e) => setDestination(e.target.value)}
                                />
                            </div>

                      
                        
                      
                        <div className="headerSearchItem">
                            <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                            {/* <span className="headerSearchText" >{`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(date[0].endDate, "MM/dd/yyyy")}`}</span> */}
                            <span className="headerSearchText" onClick={() => setOpenDate(!openDate)} >From To Date</span>





                            {openDate && (
                                <DateRange
                                    editableDateInputs={true}
                                    onChange={(item) => setDate([item.selection])}
                                    moveRangeOnFirstSelection={false}
                                    ranges={date}
                                    className="date"
                                    minDate={new Date()}
                                />
                            )}
                        </div>
                    </div>
                        <div className="headerSearchItem">
                            <button className="headerBtn " onClick={searchWithPlaceAndDate} >
                                Search
                            </button>
                        </div>
                </div>
            </div>





        </div>

    )
}

export default Main