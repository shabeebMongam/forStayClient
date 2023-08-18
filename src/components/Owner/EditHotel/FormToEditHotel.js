import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik';
import style from './FormToEditHotel.module.css'
import { deleteCurrentImgInEditOwnerApi, editHotelGetOwnerApi, editHotelPostOwnerApi } from '../../../helpers/apis/ownerApis';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import InputImageCard from '../../Common/InputImg.js/InputImageCard';


const FormToEditHotel = () => {

  const navigate = useNavigate()

  const { hotelId } = useParams()
  const [hotelData, setHotelData] = useState()




  const editHotelDetailes = async () => {
    const response = await editHotelGetOwnerApi(hotelId)
    setHotelData(response[0])

    
  }

  useEffect(() => {
    editHotelDetailes()
  }, [])




  const [currentImages, setCurrentImages] = useState([])
  const [newReceivedImages, setnewReceivedImages] = useState([])
  const [newReceivedImagesObjURL, setnewReceivedImagesObjURL] = useState()



  const districtsOfKerala = ['Alappuzha', 'Ernakulam', 'Kozhikode', 'Palakkad', 'Kollam', 'Kannur',
    'Kasaragod', 'Idukki', 'Kottayam', 'Thrissur', 'Pathanamthitta', 'Malappuram', 'Wayanad', 'Thiruvananthapuram']

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
    onSubmit: async (values) => {

      if (newReceivedImages) {
        console.log(newReceivedImages);

        const arrayOfImages = Array.from(newReceivedImages)

        const uploaders = arrayOfImages.map(file => {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", "forStay")
          formData.append("cloud_name", "shabeebimagecloud")

          return axios.post("https://api.cloudinary.com/v1_1/shabeebimagecloud/image/upload", formData).then(response => {
            const data = response.data;
            const fileURL = data.secure_url // You should store this URL for future references in your app

            values.imageUrls.push(fileURL)
          })
        })


        axios.all(uploaders).then(async () => {
          console.log("Images Added");
          console.log(values);

          const { hotelName, city, contact, pincode, district, description, imageUrls } = values

          const response = await editHotelPostOwnerApi({
            hotelName, city, contact, pincode, district, description, imageUrls, hotelId
          })
          console.log(response);

          // navigate('/owner/hotels')
          navigate('/owner/hotels')
        });
      } else {
        const { hotelName, city, contact, pincode, district, description } = values

        const response = await editHotelPostOwnerApi({
          hotelName, city, contact, pincode, district, description, hotelId
        })
        console.log(response);
      }
    }


  })

  if (hotelData && currentImages.length === 0) {
    formik.values.hotelName = hotelData.name
    formik.values.city = hotelData.city
    formik.values.contact = hotelData.contact
    formik.values.pincode = hotelData.pincode
    formik.values.district = hotelData.district
    formik.values.description = hotelData.description
    //  formik.values.receivedImages = hotelData.images
    if (hotelData.images.length > 0) {
      setCurrentImages(hotelData.images)
    }
    // console.log(data.images);
    // console.log(currentImages);
  }

  const deleteImage = async (e, img) => {
    e.preventDefault()
    const response = await deleteCurrentImgInEditOwnerApi({ img, hotelId })
    // console.log(response);
    setCurrentImages(response)
  }




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
    <>

      <form onSubmit={formik.handleSubmit}>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-6 group">
            <input value={formik.values.hotelName} name="hotelName" onChange={formik.handleChange} type="text" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Hotel Name</label>
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
            <input value={formik.values.pincode} name="pincode" onChange={formik.handleChange} type="number" id="floating_last_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label htmlFor="floating_last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Pin Code</label>
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
          <input name='images' onChange={addingNewImages} accept="image/png, image/jpeg, " className="block w-full text-sm text-gray-400 border border-gray-300 rounded-lg cursor-pointer bg-gray-50  focus:outline-none " type="file" multiple />
        </div>

        {currentImages &&
          <div className={`${style.forImgGrid} mt-5 `}>
            {currentImages.map(img =>
              <div className={style.forDiv} key={img} >
                <img src={img} alt="" />
                <div className={style.forClosing} onClick={(e) => deleteImage(e, img)}>X
                </div>
              </div>)}
          </div>

        }

        {newReceivedImagesObjURL &&
          <div className={`${style.forImgGrid} mt-5 `}>
            {newReceivedImagesObjURL.map(img =>
              <div className={style.forDiv} key={img} >
                <img src={img} alt="" />
                <div className={style.forClosing}>X
                </div>
              </div>)}
          </div>
        }
        {/* {newReceivedImagesObjURL &&
          <div className={`${style.imageGrid} mt-10 `}>
            {newReceivedImagesObjURL.map(img =>
              <div className='flex justify-center   items-center' key={img} >
                <img className=' h-52 w-auto' src={img} alt="" />
                <button className={style.forClose} onClick={(e) => deleteImage(e, img)} > X </button>
              </div>)}
          </div>
        } */}



        {/* <div className={`${style.forImgGrid} mt-5 `}>
          <div className={style.forDiv} >
            <img src="" alt="" />

            <div className={style.forClosing}>

            </div>
          </div>
        </div> */}

        <div className='flex justify-end mt-10'>
          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
        </div>
      </form>
    </>
  )
}

export default FormToEditHotel