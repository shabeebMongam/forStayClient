import { Route, Routes } from 'react-router-dom';
import React from 'react';
import Dashboard from '../pages/Admin/Dashboard';
import Login from '../pages/Admin/Login';
import PendingApproval from '../pages/Admin/PendingApproval';
import AdminPrivateRoutes from '../helpers/PrivateRoutes/AdminPrivateRoutes';
import Users from '../pages/Admin/Users';
import Owners from '../pages/Admin/Owners';
import Hotels from '../pages/Admin/Hotels';

const Admin = () => {
    return (
        <>
            <Routes>
                <Route element={<AdminPrivateRoutes />} >
                    <Route exact path='/' element={<Dashboard />} />
                    <Route exact path='/users' element={<Users />} />
                    <Route exact path='/owners' element={<Owners />} />
                    <Route exact path='/hotels' element={<Hotels />} />
                    <Route exact path='/approval' element={<PendingApproval />} />
                </Route>
                <Route exact path='/login' element={<Login />} />
            </Routes>
        </>
    )
}

export default Admin