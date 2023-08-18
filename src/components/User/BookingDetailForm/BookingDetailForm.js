import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import { getAddressUserApi, informOwnerBookingUserApi } from '../../../helpers/apis/userApis';
import { object, string, number } from 'yup';


const BookingDetailForm = ({ startDate, endDate }) => {

    const [address,setAddress] = useState([]) 

    const getAddress = async ()=>{
        const response = await getAddressUserApi()

        setAddress(response)
        console.log(response);
    } 
    useEffect(()=>{
        getAddress()
    },[])

    const navigate = useNavigate()

    const { roomId, hotelId } = useParams()

    console.log(roomId, hotelId);


    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            address: "",
            state: "",
            city: "",
            zipcode: "",
            saveAddress:""

        },
        // validationSchema: object({
        //     name: string().required("Required").trim("Space not allowed"),
        //     email: string().required("Required").email("Email"),
        //     address: string().required("Required").trim(),
        //     state: string().required("Required").trim(),
        //     city: string().required("Required").trim(),
        //     zipcode: number().required("Required").trim(),
            
        // }),

        onSubmit: async (values) => {
            console.log(values);
            const response = await informOwnerBookingUserApi({ values, roomId, hotelId, startDate, endDate })

            console.log(response);
            navigate('/bookings')
        }


    })


    const toUseThisAddress = (addressId)=>{
        const getThisPerticularAddress = ()=>{
            const add = address.filter((data)=>data._id === addressId)
            return add
        }

        const addressToUse =  getThisPerticularAddress()

        if(addressToUse){
       
            formik.setFieldValue("name", addressToUse[0].name)
            formik.setFieldValue("email", addressToUse[0].email)
            formik.setFieldValue("address", addressToUse[0].address)
            formik.setFieldValue("state", addressToUse[0].state)
            formik.setFieldValue("city", addressToUse[0].city)
            formik.setFieldValue("zipcode", addressToUse[0].zipcode)
        }


    }


    return (
        // < !--component -- >
        //   <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
        <div className="container max-w-screen-lg mx-auto ">
            <div>
                {/* <h2 className="font-semibold text-xl text-gray-600">Responsive Form</h2>
                  <p className="text-gray-500 mb-6">Form is mobile responsive. Give it a try.</p> */}

                <div className="bg-white rounded-lg shadow-lg p-4 px-4 md:p-8 mb-6">
                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                        <div className="text-gray-600 ">
                            <p className="font-medium text-lg">Personal Details</p>

                                <p className='font-semibold mt-5' >Saved Address</p>

                            {address.length>0 ? <div className='mt-3 overflow-y-scroll h-48 '>
                                {
                                    address?.map((data)=>{
                                        return(
                                            <div className='border rounded-lg px-4 py-2 flex justify-between mb-2' key={data._id}>
                                                <div>
                                                    <p>{data.name}</p>
                                                    <p>{data.city}</p>
                                                </div>
                                                <button className='border px-4 py-1 text-white  bg-rose-500 rounded-lg' onClick={()=>toUseThisAddress(data._id)} >Use </button>
                                            </div>
                                        )
                                    })
                                }
                            </div> : "No saved Address"}
                        </div>

                        <div className="lg:col-span-2">
                            <form className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5" onSubmit={formik.handleSubmit}>
                                <div className="md:col-span-5">
                                    <label htmlFor="full_name">Full Name</label>
                                    <input type="text" name="name" id="full_name" onBlur={formik.handleBlur} value={formik.values.name} onChange={formik.handleChange} className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                                    {formik.touched.name && formik.errors.name ? <p className='text-red-500' >{formik.errors.name}</p> : null}
                                </div>

                                <div className="md:col-span-5">
                                    <label htmlFor="email">Email Address</label>
                                    <input type="text" name="email" id="email" value={formik.values.email} onChange={formik.handleChange} className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="" />
                                    {formik.touched.email && formik.errors.email ? <p className='text-red-500' >{formik.errors.email}</p> : null}
                                </div>

                                <div className="md:col-span-3">
                                    <label htmlFor="address">Address / Street</label>
                                    <input type="text" name="address" id="address" value={formik.values.address} onChange={formik.handleChange} className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="" />
                                    {formik.touched.address && formik.errors.address ? <p className='text-red-500' >{formik.errors.address}</p> : null}
                                </div>

                                <div className="md:col-span-2">
                                    <label htmlFor="city">City</label>
                                    <input type="text" name="city" id="city" value={formik.values.city} onChange={formik.handleChange} className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="" />
                                    {formik.touched.city && formik.errors.city ? <p className='text-red-500' >{formik.errors.city}</p> : null}

                                </div>


                                <div className="md:col-span-2">
                                    <label htmlFor="state">State / province</label>
                                    <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                                        <input name="state" id="state" value={formik.values.state} onChange={formik.handleChange} placeholder="State" className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent" />
                                   
                                    </div>
                                </div>

                                <div className="md:col-span-1">
                                    <label htmlFor="zipcode">Zipcode</label>
                                    <input type="text" name="zipcode" value={formik.values.zipcode} onChange={formik.handleChange} id="zipcode" className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="" />
                                </div>
                              

                          

                                <div className="md:col-span-5 text-right flex justify-end">
                                    <div className="md:col-span-1 mr-3 my-auto">
                                        <input type="checkbox" className='mr-1' name='saveAddress' value={formik.values.saveAddress} onChange={formik.handleChange} id="toSave" />
                                        <label htmlFor="toSave">Save Address</label>
                                    </div>
                                    <div className="inline-flex items-end">
                                        <button type='submit' className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">Submit</button>
                                    </div>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>


        </div>
        //   </div>
    )
}

export default BookingDetailForm