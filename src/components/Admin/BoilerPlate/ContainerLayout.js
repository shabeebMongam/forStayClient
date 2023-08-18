import React from 'react'

const ContainerLayout = (props) => {
    return (
        <div>
            <div className='forDashboard flex pt-2'>
                {props.children}
            </div>
        </div>
    )
}

export default ContainerLayout

