import React from 'react'
import { useState } from 'react'

const HotelSlider = ({ hotelImages: slides }) => {

    const [currentIndex, setCurrentIndex] = useState(0)

    console.log(slides);


    const goToNext = () => {
        const isLastSlide = currentIndex === slides.length - 1
        const newIndex = isLastSlide ? 0 : currentIndex + 1
        setCurrentIndex(newIndex)
    }

    const goToPrev = () => {
        const isFirstSlide = currentIndex === 0
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1
        setCurrentIndex(newIndex)

    }

    return (
        <div className='relative'>
            <div className='absolute top-1/2 bg-slate-600' onClick={goToPrev}>
                Left
            </div>
            <div className='absolute top-1/2 right-0 bg-slate-500' onClick={goToNext}>
                Right
            </div>
            {slides &&
                <div className=' md:h-[600px] '  >
                    <img src={slides[currentIndex]} alt="" className='md:max-h-[600px]  mx-auto' />
                </div>}

        </div>
    )
}

export default HotelSlider