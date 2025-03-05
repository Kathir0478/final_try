import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Login'
import Home from './Home'
import Signup from './Signup'
import Updatedata from './Updatedata'
import Setdata from './Setdata'
import Accessdenied from './Accessdenied'
import Workouts from './Workouts'
import Startworkout from './Startworkout'
import Profile from './Profile'
const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/updatedata' element={<Updatedata />} />
                <Route path='/setdata' element={<Setdata />} />
                <Route path='/error' element={<Accessdenied />} />
                <Route path='/workoutplan' element={<Workouts />} />
                <Route path='/session' element={<Startworkout />} />
                <Route path='/profile' element={<Profile />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App