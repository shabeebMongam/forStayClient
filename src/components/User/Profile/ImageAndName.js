import React from 'react'

const ImageAndName = ({data}) => {
    // console.log(data);
    return (
        <div className='  mt-5 w-full '>
            <div className='container mx-auto flex   '>
                <div className='  items-center   '>
                    <img src="https://www.svgrepo.com/show/382109/male-avatar-boy-face-man-user-7.svg" className='h-60 rounded-full mx-auto' alt="" />
                </div>
                <div className='  mt-10  flex flex-col ml-5'>
                    <h1 className='bold  mb-5'>{data?data.name : ""}</h1>

                    <button>{data?data.email:""}</button>
                </div>
            </div>
        </div>
    )
}

export default ImageAndName