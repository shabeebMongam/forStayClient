import { Route, Routes } from 'react-router-dom';
import React from 'react';

import Home from '../pages/User/HomePage/Home';
import Login from '../pages/User/Login';
import Register from '../pages/User/Register';
import ProfilePage from '../pages/User/ProfilePage';
import VerifyEmail from '../components/User/VerifyEmail/VerifyEmail';
import UserPrivateRoutes from '../helpers/PrivateRoutes/UserPrivateRoutes';
import ShowRoom from '../pages/User/ShowRoom';
import MyBookings from '../pages/User/MyBookings';
import MainPage from '../pages/User/MainPage';
import ListHotels from '../pages/User/ListHotels';
import Hotel from '../pages/User/Hotel';
import { Suspense } from 'react';
import { lazy } from 'react';
import { ErrorBoundary } from '../components/Common/ErrorBoundary/ErrorBoundary';

// const ProfilePage = lazy(() => import('../pages/User/ProfilePage'))
// const MyBookings = lazy(() => import('../pages/User/MyBookings'))
// const ListHotels = lazy(() => import('../pages/User/ListHotels'))
// const Hotel = lazy(() => import('../pages/User/Hotel'))
// const ShowRoom = lazy(() => import('../pages/User/ShowRoom'))






function User() {
    return (
        <>
            <Routes>
                {/* <Suspense fallback={<div>Loading ..</div>}> */}
                <Route element={<UserPrivateRoutes />}>
                    <Route exact path='/profile' element={<ProfilePage />} />
                    <Route exact path='/bookings' element={<MyBookings />} />
                </Route>
                {/* </Suspense> */}
                <Route exact path='/room/:hotelId/:roomId' element={<ShowRoom />} />
                <Route exact path='/hotel/:hotelId' element={<Hotel />} />
                <Route exact path='/' element={<ErrorBoundary>  <MainPage /> </ErrorBoundary>} />
                <Route exact path="/users/:id/verify/:token" element={<VerifyEmail />} />
                <Route exact path='/login' element={<Login />} />
                <Route exact path='/register' element={<Register />} />
                <Route exact path='/hotels' element={<ListHotels />} />

            </Routes>
        </>
    );
}

export default User;
