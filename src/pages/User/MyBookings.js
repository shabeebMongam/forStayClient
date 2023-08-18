import React, { useEffect, useState } from 'react'
import Header from '../../components/User/Header/Header'
import { addReservedDateUserApi, myBookingDataUserApi, orderPaymentUserApi, verifyPaymentUserApi } from '../../helpers/apis/userApis'

const MyBookings = () => {

    const [bookings, setBookings] = useState()
    const [roomId, setRoomId] = useState()
    const [orderId, setOrderId] = useState()
    const [paymentCompleted, setPaymentCompleted] = useState(false)

    const [selectAll, setSelectAll] = useState(false)
    const [selectPaymentPending, setSelectPaymentPending] = useState(false)
    const [selectApprovalPending, setSelectApprovalPending] = useState(false)


    const [bookingDataPaymentPending, setBookingDataPaymentPending] = useState()
    const [bookingDataApprovalPending, setBookingDataApprovalPending] = useState()
    const [allBookingData, setAllBookingData] = useState()

    // console.log(bookings);

    const notDeleted = bookings?.filter((data) => {
        return (
            data.hotelId.status && data.roomId.status
        )
    })

    console.log(notDeleted);


    const getMyBookings = async () => {
        const response = await myBookingDataUserApi()

        setBookingDataApprovalPending(response.bookingDataApprovalPending)
        setBookingDataPaymentPending(response.bookingDataPaymentPending)
        setAllBookingData(response.bookingData)
        if (!bookings) {
            if(!selectAll){
                setSelectAll(true)
            }
            setBookings(response.bookingData)
        }
    }

    useEffect(() => {
        getMyBookings()
    }, [])

    console.log(bookingDataPaymentPending?.bookingDataPaymentPending );





    const initPayment = (data, orderId, roomId) => {
        const options = {
            key: process.env.REACT_APP_RAZORPAY_KEY_ID,
            amount: data.amount,
            currency: data.currency,
            // name : "Name",
            order_id: data.id,
            handler: async (response) => {
                try {
                    const responseData = await verifyPaymentUserApi({ response })
                    if (responseData.successMessage) {
                        // setPaymentCompleted(true)
                        const addBookedDate = async () => {
                            const response = await addReservedDateUserApi({ roomId, orderId })

                        }
                        addBookedDate()
                        getMyBookings()
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        }

        const rPayInstance = new window.Razorpay(options)
        rPayInstance.open()
    }

    const paymentSetUp = async (data) => {

        const response = await orderPaymentUserApi({ price: data.roomData.price, roomId: data.roomData._id, orderId: data.orderId })

        initPayment(response.data, response.orderId, response.roomId)


    }

    const makePayment = async (data) => {
        try {
            paymentSetUp(data)
        } catch (error) {
            console.log(error);
        }
    }

    const toSetPendingPayments = () => {
        setSelectAll(false)
        setSelectApprovalPending(false)
        setSelectPaymentPending(true)
        setBookings(bookingDataPaymentPending)
    }
    const toSetPendingApproval = () => {
        setSelectAll(false)
        setSelectPaymentPending(false)
        setSelectApprovalPending(true)
        setBookings(bookingDataApprovalPending)
    }

    const toSetAll = ()=>{
        setSelectPaymentPending(false)
        setSelectApprovalPending(false)
        setSelectAll(true)
        setBookings(allBookingData)
    }

    return (
        <div className='h-screen bg-[#f2f2f2]'>
            <Header />
            <div className='container mx-auto'>
                <h1 className='mt-10 mb-5 text-3xl font-semibold'>Bookings </h1>
                <div className='flex flex-col'>
                    <div className='flex  py-5'>
                        {!selectAll && <div className="px-5  py-2  border rounded-xl mr-2 bg-white " onClick={toSetAll}>
                            <h3>All</h3>
                        </div>}

                        {selectAll && <div className="px-5  py-2  border rounded-xl mr-2  bg-red-600" onClick={toSetAll}>
                            <h3>All</h3>
                        </div>}


                        {!selectApprovalPending &&
                            <div className='px-5  py-2 border rounded-xl mr-2 bg-white' onClick={toSetPendingApproval}>
                                <h3>Ready To Pay</h3>
                            </div >
                        }

                        {
                            selectApprovalPending &&
                            <div className='px-5  py-2 border rounded-xl mr-2 bg-red-500' onClick={toSetPendingApproval}>
                                    <h3>Ready To Pay</h3>
                            </div >
                        }

                        {
                            !selectPaymentPending &&
                            <div className='px-5 py-2  border rounded-xl mr-2 bg-white' onClick={toSetPendingPayments}>
                                <h3>Pending</h3>
                            </div>
                        }
                        {
                            selectPaymentPending &&
                            <div className='px-5 py-2  border rounded-xl mr-2 bg-red-600' onClick={toSetPendingPayments}>
                                    <h3>Pending</h3>
                            </div>
                        }
                    </div>


                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
                        {
                            bookings &&
                                bookings.length > 0 ? bookings.map((data) => {
                                    return (
                                        <div className="relative mx-auto w-full" key={data._id}>
                                            <div className="shadow p-4 rounded-lg bg-white">
                                                <div className="flex justify-center relative rounded-lg overflow-hidden h-52">
                                                    <div className="transition-transform duration-500 transform ease-in-out hover:scale-110 w-full">
                                                        {/* <div className="absolute inset-0 bg-black opacity-10"></div> */}
                                                        {bookings && <img src={data.roomId.images[0]} alt="" />}
                                                    </div>
                                                    {

                                                        data.status ?
                                                            <span className="absolute top-0 left-0 inline-flex mt-3 ml-3 px-3 py-2 rounded-lg z-10 bg-green-400 text-sm font-medium text-black select-none">
                                                                Approved
                                                            </span> :
                                                            <span className="absolute top-0 left-0 inline-flex mt-3 ml-3 px-3 py-2 rounded-lg z-10 bg-red-500 text-sm font-medium text-black select-none">
                                                                Pending
                                                            </span>
                                                    }
                                                </div>

                                                <div className="mt-4 flex justify-between">
                                                    <div>
                                                        {data.paymentStatus ?
                                                            <h2 className="font-medium text-base md:text-lg text-gray-800 line-clamp-1" title="New York">
                                                                {data.hotelId.name} <span className='text-green-500'>(Paid)</span>
                                                            </h2> :
                                                            <h2 className="font-medium text-base md:text-lg text-gray-800 line-clamp-1" title="New York">
                                                                {data.hotelId.name}
                                                            </h2>}
                                                        <p className="mt-2 text-sm text-gray-800 line-clamp-1" title="New York, NY 10004, United States">
                                                            {data.state} , {data.city}
                                                        </p>
                                                        <p className="mt-2 text-sm text-gray-800 line-clamp-1" title="New York, NY 10004, United States">
                                                            {data.startDate.split("T", 1)} ----- {data.endDate.split("T", 1)}
                                                        </p>
                                                    </div>
                                                    {!data.paymentStatus && data.status ?
                                                        <div className="mt-4">
                                                            <button className={`border rounded-md px-5 py-1`} onClick={() => makePayment({ roomData: data.roomId, orderId: data._id })} > Pay </button>
                                                        </div> :

                                                        <div className="mt-4">
                                                            {/* <button className='border rounded-md px-5 py-1 bg-green-400'  > Paid </button> */}
                                                        </div>}


                                                </div>
                                            </div>
                                        </div>)
                                }) : "No Bookings "
                        }
                    </div>
                </div>
            </div>
        </div>

    )
}

export default MyBookings