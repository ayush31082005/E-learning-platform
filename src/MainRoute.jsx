import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Course from './components/Course'
import Career from './components/Career'
import Contact from './components/Contact';
import SignUp from './components/SignUp';
import Notification from './components/Notification'
import Login from './components/Login';
import MyProfile from './components/MyProfile';
import Forget from './components/Forget'
import Payment from './components/Payment';
import Success from './components/Success';
import Dashboard from './Admin/Dashboard';



const MainRoute = () => {
    return (
        <>
            <Routes>

                <Route path='/' element={<Home />} />
                <Route path='/about' element={<About />} />
                <Route path='/course' element={<Course />} />
                <Route path='/career' element={<Career />} />
                <Route path='/contact' element={<Contact />} />
                <Route path='/signup' element={<SignUp />} />
                <Route path='/login' element={<Login />} />
                <Route path='/myProfile' element={<MyProfile />} />
                <Route path='/notification' element={<Notification />} />
                <Route path='/forget' element={<Forget />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/success" element={<Success />} />
                 <Route path="/dashboard" element={<Dashboard />} />

            </Routes>
        </>
    )
}

export default MainRoute