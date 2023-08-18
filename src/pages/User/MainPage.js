import React from 'react'
import Header from '../../components/User/Header/Header'
import Slider from '../../components/User/HeroCarousel/Slider'
import Search from '../../components/User/SearchBar/Search'
import HotelMainPageCards from '../../components/User/MainPageHotels/HotelMainPageCards'
import UserFooter from '../../components/User/Footer/UserFooter'

const MainPage = () => {
  const slides = [
    "https://res.cloudinary.com/shabeebimagecloud/image/upload/v1680677199/Slider/2_ftsj8f.png",
    "https://res.cloudinary.com/shabeebimagecloud/image/upload/v1680677199/Slider/3_oyn3w5.png",
    "https://res.cloudinary.com/shabeebimagecloud/image/upload/v1680677198/Slider/1_ijrapr.png",
  ]
  return (
    <div >

      <div className='mx-auto' style={{ maxWidth: "1920px" }}>
        <Header />
        <div className='hidden md:block  mx-auto'>
          <Slider>
            {
              [...slides.map((slide, i) => {
                return (
                  <img src={slide} alt='a' key={i} />
                )
              })]
            }
          </Slider>
        </div>

        <div className='py-5' style={{ backgroundColor: "#54B435 " }}>
          <Search />
        </div>

        <div className='mx-auto   pb-10 ' style={{ backgroundColor: "#f2f2f2" }}>
          <div className='container mx-auto flex justify-center'> 

          <h1 className=' font-semibold text-3xl  pt-32 pb-20  ' style={{ color: "#54B435" }}>HOTELS</h1>
            </div>

          <HotelMainPageCards />
        </div>

          <UserFooter/>

      </div>
    </div>
  )
}

export default MainPage