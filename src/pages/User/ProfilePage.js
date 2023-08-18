import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../components/User/Header/Header'
import Details from '../../components/User/Profile/Details'
import ImageAndName from '../../components/User/Profile/ImageAndName'
import { getUserDataUserApi } from '../../helpers/apis/userApis'


const ProfilePage = () => {

    const [userData,setUserData] = useState()

    // const navigate = useNavigate()

    // useEffect(() => {
    //     const checkUserToken = localStorage.getItem('userToken')
    //     if (!checkUserToken) {
    //         navigate("/login")
    //     }
    // },[])

    const getUserData = async ()=>{
        const response = await getUserDataUserApi()
        console.log(response);
        setUserData(response)
    } 
    useEffect(()=>{
        getUserData()
    },[])



    return (
        <div className='h-screen '>
            <Header />
            <div className='  flex flex-col container mx-auto  w-1/2 '>
                <ImageAndName  data={userData} />
                <Details />
            </div>
        </div>
    )
}

export default ProfilePage