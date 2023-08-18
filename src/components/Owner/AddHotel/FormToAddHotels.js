import React from 'react'
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import { Box, FormControl, InputLabel, ListItem, MenuItem, Select } from '@mui/material';
import TextareaAutosize from '@mui/base/TextareaAutosize';
const FormToAddHotels = () => {
    const formik = useFormik({
        initialValues: {
            hotelName: "shabeeb"
        }
    })


  return (
    <Box component="form">  
          <div className="grid md:grid-cols-2 md:gap-6 mb-4">
              {/* <div className="relative z-0 w-full mb-6 group">
                                <input value={hotelName} onChange={(e) => setHotelName(e.target.value)} type="text" name="floating_first_name" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Hotel Name</label>
                            </div> */}


              <TextField id="outlined-basic" label="Hotel Name" variant="outlined" name='hotelName' value={formik.values.hotelName} onChange={formik.handleChange} />
              <TextField id="outlined-basic" label="City" variant="outlined" name='city' value={formik.values.city} onChange={formik.handleChange} />


              {/* <div className="relative z-0 w-full mb-6 group">
                  <input value={city} onChange={(e) => setCity(e.target.value)} type="text" name="floating_last_name" id="floating_last_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                  <label htmlFor="floating_last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Place (City)</label>
              </div> */}
          </div>




          <div className="grid md:grid-cols-2 md:gap-6 mb-5">
              <TextField id="outlined-basic" label="Contact" variant="outlined" name='contact' value={formik.values.contact} onChange={formik.handleChange} />
              <TextField id="outlined-basic" label="Pin Code" variant="outlined" name='pinCode' value={formik.values.pinCode} onChange={formik.handleChange} />

              {/* <div className="relative z-0 w-full mb-6 group">
                  <input value={contact} onChange={(e) => setContact(e.target.value)} type="number" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" name="floating_phone" id="floating_phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                  <label htmlFor="floating_phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Contact Number</label>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                  <input value={pincode} onChange={(e) => setPincode(e.target.value)} type="number" name="floating_last_name" id="floating_last_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                  <label htmlFor="floating_last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Pin Code</label>
              </div> */}
          </div>



          <div className='grid md:grid-cols-2 md:gap-6  mb-5'>
              <FormControl  >
                  <InputLabel id="">District</InputLabel>
                  {/* <label htmlFor="">District</label> */}
                  <Select
                    //   labelId="demo-simple-select-label"
                    //   id="demo-simple-select"
                    //   value={age}
                      label="District"
                    //   onChange={handleChange}
                  >
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
              </FormControl>


              {/* <div className="relative z-0 w-full  group">
                  <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-400 ">Select your district</label>
                  <select value={district} required onChange={(e) => setDistrict(e.target.value)} id="countries" className="bg-gray-50 border border-gray-300 text-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                      <option disabled selected>Select your district</option>
                      {districtsOfKerala.map(district => <option key={district}>{district}</option>)}
                  </select>
              </div> */}
          </div>


          {/* <div className="relative z-0 w-full mb-4  group">
              <label htmlFor="message" className="block mb-2 text-sm font-medium  ">Description</label>
              <textarea required   id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Description...."></textarea>
          </div> */}
          <div className="relative z-0 w-full mb-4   group">
              {/* <TextField id="outlined-basic" label="Description" variant="outlined"  name='pinCode' fullWidth value={formik.values.pinCode} onChange={formik.handleChange} className="h-full" /> */}
              <TextareaAutosize
                  aria-label="minimum height"
                  minRows={3}
                  label = "Description"
                  placeholder="Desscription"
                  style={{ width: "100%", border : "gray solid 1px", borderRadius:"5px", paddingLeft:"10px", paddingTop:"5px" }}
              />
          </div>


          <div className="relative z-0 w-full mb-6 group">
              {/* <label className="block mb-2 text-sm font-medium text-gray-400 " htmlFor="multiple_files">Upload multiple files</label>
              <input onChange={imageUpload} accept="image/png, image/jpeg, " className="block w-full text-sm text-gray-400 border border-gray-300 rounded-lg cursor-pointer bg-gray-50  focus:outline-none " id="multiple_files" type="file" multiple required /> */}


              <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Upload file</label>
              <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file"/>


          </div>

          {/* 
        <div className='flex justify-end mt-3'>
            <button onClick={imageUpload}  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Confirm Images</button>
        </div> */}
          <div className='flex justify-end mt-3'>
              <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
          </div>

    </Box>
  )
}

export default FormToAddHotels