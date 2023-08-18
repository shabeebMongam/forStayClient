import React, { useState, useRef } from 'react'
import axios from 'axios'
import { addHotelOwnerApi } from '../../../helpers/apis/ownerApis'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { endLoading, startLoading } from '../../../redux/slices/userLoading'
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { object, string, number }from 'yup';


import style from './FormToAddHotel.module.css'
import { ToastContainer, toast } from 'react-toastify'


const FormToAddHotel = () => {

    const notify = (msg) => toast(msg);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const districtsOfKerala = ['Alappuzha', 'Ernakulam', 'Kozhikode', 'Palakkad', 'Kollam', 'Kannur',
        'Kasaragod', 'Idukki', 'Kottayam', 'Thrissur', 'Pathanamthitta', 'Malappuram', 'Wayanad', 'Thiruvananthapuram']


    const [images, setImages] = useState([])
    const [receivedImages, setreceivedImages] = useState([])
    const [receivedImagesObjectURLS, setreceivedImagesObjectURLS] = useState([])

    const formik = useFormik({
        initialValues: {
            hotelName: "",
            city: "",
            contact: "",
            pincode: "",
            district: "",
            description: "",
            imageUrls: []
        },
        validationSchema: object({
            hotelName: string().required("Required").trim("Space not allowed"),
            pincode:number("Should be a number").required("Required").positive("No negatives"),
            city: string().required("Required").trim("Space not allowed"),
            contact: number("Number").required("Required"),
            district: string().required("Required").trim("Space not allowed"),
            description: string().required("Required").trim("Space not allowed"),
        }),
        onSubmit: async (values) => {

            dispatch(startLoading())

            const arrayOfImages = Array.from(receivedImages)

            const uploaders = arrayOfImages.map(file => {
                const formData = new FormData();
                formData.append("file", file);
                formData.append("upload_preset", "forStay")
                formData.append("cloud_name", "shabeebimagecloud")

                return axios.post("https://api.cloudinary.com/v1_1/shabeebimagecloud/image/upload", formData).then(response => {
                    const data = response.data;
                    const fileURL = data.secure_url // You should store this URL for future references in your app

                    // setImages((prev) => {
                    //     return [...prev, fileURL]
                    // })
                    values.imageUrls.push(fileURL)
                    // console.log(data);
                })
            })

            // Once all the files are uploaded 
            axios.all(uploaders).then(async () => {
                console.log("Images Added");
                console.log(values);

                const { hotelName, city, contact, pincode, district, description, imageUrls } = values

                const response = await addHotelOwnerApi({
                    hotelName, city, contact, pincode, district, description, imageUrls
                })
                console.log(response);

                dispatch(endLoading())

                notify("Room Added")

                setTimeout(navigate('/owner/hotels'), 3000)
                
            });
            console.log(values);
        }

    })

    const imageOnChange = (e) => {
        console.log("1");
        const allInputs = e.target.files
        console.log(allInputs);
        const allInputsInArray = Array.from(allInputs)

        const objUrl = allInputsInArray.map((file) => {
            return URL.createObjectURL(file)
        })

        setreceivedImagesObjectURLS(objUrl)

        console.log(receivedImagesObjectURLS);
        setreceivedImages( e.target.files)
    }







    // const userLoading = useSelector((state)=> state.userLoading  )



    return (
        <>

            <form onSubmit={formik.handleSubmit}>
                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-6 group">
                        <input value={formik.values.hotelName} name="hotelName" onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Hotel Name</label>
                        {formik.touched.hotelName && formik.errors.hotelName ? <p className='text-red-500' >{formik.errors.hotelName}</p>:null}
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                        <input value={formik.values.city} name="city" onChange={formik.handleChange} type="text" id="floating_last_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label htmlFor="floating_last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Place (City)</label>
                    </div>
                </div>




                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-6 group">
                        <input value={formik.values.contact} name="contact" onChange={formik.handleChange} type="number" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" id="floating_phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label htmlFor="floating_phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Contact Number</label>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                        <input value={formik.values.pincode} onBlur={formik.handleBlur} name="pincode" onChange={formik.handleChange} type="number" id="floating_last_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label htmlFor="floating_last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Pin Code</label>
                        {formik.touched.pincode && formik.errors.pincode ? <p className='text-red-500' >{formik.errors.pincode}</p> : null}

                    </div>
                </div>



                <div className="grid md:grid-cols-2 md:gap-6 mb-6">
                    <div className="relative z-0 w-full  group">
                        <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-400 ">Select your district</label>
                        <select required name='district' value={formik.values.district} onChange={formik.handleChange} id="countries" className="bg-gray-50 border border-gray-300 text-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                            <option hidden>Select your district</option>
                            {districtsOfKerala.map(district => <option key={district}>{district}</option>)}
                        </select>
                    </div>
                </div>


                <div className="relative z-0 w-full mb-4  group">
                    <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-400 ">Description</label>
                    <textarea required value={formik.values.description} onChange={formik.handleChange} name="description" id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Description...."></textarea>
                </div>


                <div className="relative z-0 w-full mb-6 group">
                    <label className="block mb-2 text-sm font-medium text-gray-400 " htmlFor="multiple_files">Upload Hotel Images</label>
                    <input name='images' onChange={imageOnChange} accept="image/png, image/jpeg, " className="block w-full text-sm text-gray-400 border border-gray-300 rounded-lg cursor-pointer bg-gray-50  focus:outline-none " type="file" multiple required />
                </div>
                {receivedImagesObjectURLS &&
                    <div className={`${style.imageGrid} mt-10 `}>
                        {receivedImagesObjectURLS.map(img => <div className='flex justify-center border items-center' key={img} > <img className=' h-52 w-auto' src={img} alt="" /> </div>)}
                    </div>

                }

                <div className='flex justify-end mt-3'>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                </div>
            </form>

            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </>
    )
}

export default FormToAddHotel