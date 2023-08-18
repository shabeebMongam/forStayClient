import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { endLoading, startLoading } from '../../../redux/slices/userLoading';
import axios from 'axios';
import { addRoomOwnerApi, editRoomGetOwnerApi } from '../../../helpers/apis/ownerApis';
import Select from 'react-dropdown-select';

import style from './EditRoomForm.module.css'

const EditRoomForm = () => {

    const { roomId } = useParams()
    const [roomData, setRoomData] = useState()

    const [currentImages, setCurrentImages] = useState([])
    const [newReceivedImages, setnewReceivedImages] = useState([])
    const [newReceivedImagesObjURL, setnewReceivedImagesObjURL] = useState()

    const editRoomDetailes = async () => {
        const response = await editRoomGetOwnerApi(roomId)
        console.log(response);
        setRoomData(response[0])
    }

    useEffect(() => {
        editRoomDetailes()
    }, [])



    const typeOfRooms = ['Standard', 'Budget', 'Deluxe']
    const aminities = [
        { value: 'AC', label: 'AC' },
        { value: 'Wifi', label: 'Wifi' },
        { value: 'Washing Machine', label: 'Washing Machine' },
        { value: 'Kitchen', label: 'Kitchen' },
    ]

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { hotelId } = useParams()
    const [selectedAminities, setSelectedAminities] = useState([])
    const [receivedImagesObjectURLS, setreceivedImagesObjectURLS] = useState([])
    const [receivedImages, setreceivedImages] = useState([])
    const [addedImages, setAddedImages] = useState(false)

    const aminityData = selectedAminitie => {
        // console.log(selectedAminities);
        setSelectedAminities(selectedAminitie)

    }



    const formik = useFormik({
        initialValues: {
            roomNumber: "",
            totalCapacity: "",
            description: "",
            roomType: "",
            price: "",
            aminities: [],
            imageUrls: []

        },


    })

    if (roomData && currentImages.length === 0) {

        console.log(roomData);

        formik.values.roomNumber = roomData.roomNumber
        formik.values.totalCapacity = roomData.totalCapacity
        formik.values.description = roomData.description
        formik.values.roomType = roomData.roomType
        formik.values.price = roomData.price
        formik.values.aminities = roomData.aminities


        if (roomData.images.length > 0) {
            setCurrentImages(roomData.images)
        }
        // console.log(data.images);
        // console.log(currentImages);
    }


    // const deleteImage = async (e, img) => {
    //     e.preventDefault()
    //     const response = await deleteCurrentImgInEditOwnerApi({ img, hotelId })
    //     // console.log(response);
    //     setCurrentImages(response)
    // }


    const addingNewImages = (e) => {

        const theimgFile = e.target.files
        const allInputsInArray = Array.from(theimgFile)

        const objUrl = allInputsInArray.map((file) => {
            return URL.createObjectURL(file)
        })
        setnewReceivedImagesObjURL(objUrl)
        setnewReceivedImages(e.target.files)
    }











    return (
        <div>
            <form onSubmit={formik.handleSubmit} >
                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-6 group">
                        <input value={formik.values.roomNumber} name="roomNumber" onChange={formik.handleChange} type="text" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Room Number</label>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                        <input value={formik.values.totalCapacity} name="totalCapacity" onChange={formik.handleChange} type="text" id="floating_last_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label htmlFor="floating_last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Total Capacity</label>
                    </div>
                </div>







                <div className="grid md:grid-cols-2 md:gap-6 mb-6">
                    <div className="relative z-0 w-full  group">
                        <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-400 ">Room Type</label>
                        <select required name='roomType' value={formik.values.roomType} onChange={formik.handleChange} id="countries" className="bg-gray-50 border border-gray-300 text-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                            <option hidden>Room Category</option>
                            {typeOfRooms.map(type => <option key={type}>{type}</option>)}
                        </select>
                    </div>
                    <div className="relative z-0 w-full mb-6 group z-40">
                        <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-400 ">Aminities</label>

                        <Select
                            options={aminities}
                            isMulti
                            name="aminities"
                            className="basic-multi-select"
                            classNamePrefix="select"
                            onChange={aminityData}
                        />

                    </div>
                </div>


                <div className="grid md:grid-cols-2 md:gap-6 mb-6">



                    <div className="relative z-0 w-full mb-4  group ">
                        <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-400 ">Description</label>
                        <textarea required value={formik.values.description} onChange={formik.handleChange} name="description" id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Description...."></textarea>
                    </div>

                    <div className="relative z-0 w-full mb-6 group">
                        <input value={formik.values.price} name="price" onChange={formik.handleChange} type="text" id="floating_last_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label htmlFor="floating_last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Price</label>
                    </div>
                </div>


                <div className="relative z-0 w-full mb-6 group ">
                    <label className="block mb-2 text-sm font-medium text-gray-400 " htmlFor="multiple_files">Upload Hotel Images</label>
                    <input name='images' onChange={addingNewImages} accept="image/png, image/jpeg, " className="block w-full text-sm text-gray-400 border border-gray-300 rounded-lg cursor-pointer bg-gray-50  focus:outline-none " type="file" multiple    />
                </div>

                {currentImages &&
                    <div className={`${style.forImgGrid} mt-5 `}>
                        {currentImages.map(img =>
                            <div className={style.forDiv} key={img} >
                                <img src={img} alt="" />
                                {/* <div className={style.forClosing} onClick={(e) => deleteImage(e, img)}>X
                              </div> */}
                            </div>)}
                    </div>

                }
                {newReceivedImagesObjURL &&
                    <div className={`${style.forImgGrid} mt-5 `}>
                        {newReceivedImagesObjURL.map(img =>
                            <div className={style.forDiv} key={img} >
                                <img src={img} alt="" />
                                {/* <div className={style.forClosing}>X
                              </div> */}
                            </div>)}
                    </div>
                }


                <div className='flex justify-end mt-3'>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default EditRoomForm