import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const AdminPrivateRoutes = () => {
    const adminAuthToken = localStorage.getItem('adminToken')
    return (
        adminAuthToken ? <Outlet /> : <Navigate to={"/admin/login"} />
    )
}

export default AdminPrivateRoutes





