import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useFormik } from 'formik';
import { addRoomOwnerApi } from '../../../helpers/apis/ownerApis';
import Select from 'react-select'
import axios from 'axios';
import style from './FormToAddRoom.module.css'
import Loading from '../../Common/Loader/Loading';
import { useDispatch } from 'react-redux';
import { startLoading } from '../../../redux/slices/userLoading';
import { endLoading } from '../../../redux/slices/userLoading';
import { object, string, number } from 'yup';


const FormToAddRoom = () => {

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
  const [addedImages,setAddedImages]=useState(false)

 



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
    validationSchema: object({
      hotelName: string().required("Required").trim("Space not allowed"),
      pincode: number("Should be a number").required("Required").positive("No negatives"),
      city: string().required("Required").trim("Space not allowed"),
      contact: number("Number").required("Required"),
      district: string().required("Required").trim("Space not allowed"),
      description: string().required("Required").trim("Space not allowed"),
    }),
    
    onSubmit: async (values) => {
      // setLoading(true)

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
          setAddedImages(true)
        })
      })

     

      axios.all(uploaders).then(async () => {
        // console.log("Room Images Added");
        // values.aminities = selectedAminities

        // const { roomNumber, totalCapacity, description, aminities, imageUrls, roomType,price } = values

        // const response = await addRoomOwnerApi({
        //   roomNumber, totalCapacity, description, aminities, imageUrls, hotelId, roomType,price
        // })


        // values.aminities = selectedAminities

        const { roomNumber, totalCapacity, description, aminities, imageUrls, roomType, price } = values

        const response = await addRoomOwnerApi({ roomNumber, totalCapacity, description, aminities, imageUrls, hotelId, roomType, price })

        // console.log(response);

        // setLoading(false)
        dispatch(endLoading())


        navigate(`/owner/showRooms/${hotelId}`)

      });

      // if (addedImages) {

      //   values.aminities = selectedAminities

      //   const { roomNumber, totalCapacity, description, aminities, imageUrls, roomType, price } = values

      //   const response = await addRoomOwnerApi({roomNumber, totalCapacity, description, aminities, imageUrls, hotelId, roomType,price})

      //   // console.log(response);

      //   // setLoading(false)
      //   dispatch(endLoading())


      //   navigate(`/owner/showRooms/${hotelId}`)
      // }
    }

  })
  const aminityData = (selectedAminitie) => {
  //  console.log(selectedAminitie);
  formik.setFieldValue("aminities" , selectedAminitie)
  }

  // console.log(aminityData);



  const imageOnChange = (e) => {

    const allInputs = e.target.files
    console.log(allInputs);
    const allInputsInArray = Array.from(allInputs)

    const objUrl = allInputsInArray.map((file) => {
      return URL.createObjectURL(file)
    })

    setreceivedImagesObjectURLS(objUrl)

    console.log(receivedImagesObjectURLS);

    setreceivedImages(e.target.files)

  }


  return (
    <>
      
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
    </>
  )
}

export default FormToAddRoom