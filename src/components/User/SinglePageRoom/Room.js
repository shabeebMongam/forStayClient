// import Navbar from "../../components/navbar/Navbar";
// import Header from "../../components/header/Header";
// import MailList from "../../components/mailList/MailList";
// import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircleArrowLeft,
    faCircleArrowRight,
    faCircleXmark,
    faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import { getRoomDataUserApi, orderPaymentUserApi, orderUserApi, verifyPaymentUserApi } from "../../../helpers/apis/userApis";
import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import {lazy, Suspense} from "react";

import "react-datepicker/dist/react-datepicker.css";
import './Room.css'

import { addDays } from "date-fns";
import Loading from "../../Common/Loader/Loading";
const BookingDetailForm = lazy(() => import('../BookingDetailForm/BookingDetailForm'))

// import BookingDetailForm from '../BookingDetailForm/BookingDetailForm'



const Room = () => {


    const [bookedDate, setBookedDate] = useState([])
    const [slideNumber, setSlideNumber] = useState(0);
    const [open, setOpen] = useState(false);
    const [receivedRoomDatas, setreceivedRoomDatas] = useState()
    const [receivedHotelDatas, setreceivedHotelDatas] = useState()
    const [rooms, setRooms] = useState([])
    const [bookedDatesInFormat, setBookedDatesInFormat] = useState()
    const [loading, setLoading] =useState (false)




    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);
    const [dateNotPicked, setdateNotPicked] = useState(false)

    const [showBookingDetailes, setShowBookingDetailes] = useState(false)

    const bookingDetailsRef = useRef(null)  


    const onChangeDate = (dates) => {

        if (dateNotPicked) {
            setdateNotPicked(false)
        }

        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);


        console.log(startDate, endDate);
    };

    const addPhoto = () => {
        if (receivedRoomDatas) {
            receivedRoomDatas.images.forEach((img) => {
                photos.push(img)
            })
        }
    }



    let photos = [
    
    ];

    addPhoto()


    const handleOpen = (i) => {
        setSlideNumber(i);
        setOpen(true);
    };

    const handleMove = (direction) => {
        let newSlideNumber;

        if (direction === "l") {
            newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
        } else {
            newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
        }

        setSlideNumber(newSlideNumber)
    };





    const { hotelId, roomId } = useParams()

    const roomData = async () => {
        //  console.log(hotelId,roomId);

        setLoading(true)


        const response = await getRoomDataUserApi({ hotelId, roomId })
        console.log(response);
        setreceivedRoomDatas(response.room)
        setreceivedHotelDatas(response.hotel)
        setBookedDate(response.room.reservedDates)

        console.log(bookedDate);
        setLoading(false)

        // console.log(response.rooms);
        // setRooms(response.rooms)

    }

    useEffect(() => {
        roomData()
      

    }, [])

    

    const toScroll = () => {
        console.log("before");
        bookingDetailsRef.current.scrollIntoView({ behavior: 'smooth' })
        console.log("after");

    }


    const toBookRoom = () => {
        if (!endDate) {
            setdateNotPicked(true)

        } else {
            setShowBookingDetailes(true)
        }
        if (showBookingDetailes) {
            toScroll()
        }

    }

    // console.log(bookedDate);
    if(bookedDate){
        const allBkdDates = bookedDate

        console.log(allBkdDates);

        const inDate = allBkdDates.map((date) => {
            return (
                new Date(date)
            )
        })
        // console.log(inDate);
        setBookedDatesInFormat(inDate)
        setBookedDate(null)

    }
      
// console.log(bookedDatesInFormat);   
    

    return (
        <div>
            {loading && <Loading />  }  
            <div className="hotelContainer bg-[#f2f2f2]">
                {open && (
                    <div className="slider">
                        <FontAwesomeIcon
                            icon={faCircleXmark}
                            className="close"
                            onClick={() => setOpen(false)}
                        />
                        <FontAwesomeIcon
                            icon={faCircleArrowLeft}
                            className="arrow"
                            onClick={() => handleMove("l")}
                        />
                        <div className="sliderWrapper">
                            <img src={photos[slideNumber]} alt="" className="sliderImg" />
                        </div>
                        <FontAwesomeIcon
                            icon={faCircleArrowRight}
                            className="arrow"
                            onClick={() => handleMove("r")}
                        />
                    </div>
                )}
                {receivedRoomDatas ? <div className="hotelWrapper" key={receivedRoomDatas._id}>
                    <h1 className="hotelTitle">{receivedHotelDatas.name}</h1>
                    <div className="hotelAddress">
                        <FontAwesomeIcon icon={faLocationDot} />
                        <span>{receivedHotelDatas.district} {receivedHotelDatas.city} </span>
                    </div>
                    <span className="hotelDistance">
                        {/* Excellent location – 500m from center */}
                    </span>
                    <span className="hotelPriceHighlight">
                        {/* Book a stay over $114 at this property and get a free airport taxi */}
                    </span>
                    <div className="hotelImages">
                        {photos.map((photo, i) => (
                            <div className="hotelImgWrapper" key={i}>
                                <img
                                    onClick={() => handleOpen(i)}
                                    src={photo}
                                    alt=""
                                    className="hotelImg"
                                />
                            </div>
                        ))}
                    </div>
                    <div className="hotelDetails flex-col md:flex-row px-10">
                        <div className="hotelDetailsTexts">
                            <h1 className="hotelTitle">Room Number : {receivedRoomDatas.roomNumber}</h1>
                            <p className="hotelDesc">
                                {receivedRoomDatas.description}
                            </p>
                            <div className="  flex justify-end">
                            <h1 className=" my-2">{receivedRoomDatas.aminities.map((a)=> <div className="border py-2 px-3 rounded-xl flex my-1"> {a} </div>)}</h1>
                            </div>
                         
                        </div>
                        <div className="hotelDetailsPrice mb-5 items-center">
                            {dateNotPicked ? <span className="bg-red-500 px-2 rounded-sm "> Please pick a Date </span> : " "}



                            <DatePicker
                                selected={startDate}
                                onChange={onChangeDate}
                                startDate={startDate}
                                endDate={endDate}
                                minDate={new Date()}
                                    excludeDates={bookedDatesInFormat}
                                // excludeDates={[addDays(new Date(), 1), addDays(new Date(), 5)]}
                                // filterDate={receivedRoomDatas.reservedDates}
                                selectsRange
                                inline
                            />
                            {/* <h2>{receivedRoomDatas.reservedDates[0] }</h2>
                            <h2>{receivedRoomDatas.reservedDates[2] }</h2> */}

                            <h2>
                                <b>{"$" + receivedRoomDatas.price}/ Night</b>
                            </h2>
                            {showBookingDetailes ? "" : <button onClick={toBookRoom} >Book Now!</button>}
                             {/* <button onClick={toBookRoom} >Book Now!</button> */}
                            
                        </div>
                    </div>
                </div> : ""}





            </div>
            <div ref={bookingDetailsRef}>

                {showBookingDetailes &&
                    <Suspense fallback={<div>Loading..</div>}>
                        <BookingDetailForm startDate={startDate} endDate={endDate} />
                    </Suspense>
                }
            </div>





        </div>
    );
}

export default Room