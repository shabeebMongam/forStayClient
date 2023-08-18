import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Main from '../../../components/User/Dummy/main/Main'
import Featured from '../../../components/User/Dummy/featured/Featured'
import PropertyList from '../../../components/User/Dummy/propertyList/PropertyList'
import FeaturedProperties from '../../../components/User/Dummy/featuredProperties/FeaturedProperties'
import MailList from '../../../components/User/Dummy/mailList/MailList'
import Footer from '../../../components/User/Dummy/footer/Footer'
import Header from '../../../components/User/Header/Header'

import './Home.css'



const Home = () => {
    
   
    return (

        <div>
            <Header />

            <Main />
            <div className="homeContainer">
                <Featured />
                <h1 className="homeTitle">Browse by property type</h1>
                <PropertyList />
                <h1 className="homeTitle">Homes guests love</h1>
                <FeaturedProperties />
                <MailList />
                <Footer />
            </div>
        </div>
        
    )
}

export default Home