import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const OwnerPrivateRoutes = () => {
    const ownerAuthToken = localStorage.getItem('ownerToken')
    return (
        ownerAuthToken ? <Outlet /> : <Navigate to={"/owner/login"} />
    )
}

export default OwnerPrivateRoutes