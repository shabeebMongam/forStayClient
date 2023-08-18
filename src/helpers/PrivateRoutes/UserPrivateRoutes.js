import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const UserPrivateRoutes = () => {
  const userAuthToken = localStorage.getItem('userToken')
  return (
    userAuthToken ? <Outlet /> : <Navigate to={"/"} />
  )
}

export default UserPrivateRoutes
