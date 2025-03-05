import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const [user, setUser] = useState("")
    const navigate = useNavigate()
    const base_api="https://final-try-backend.onrender.com"
    const api = `${base_api}/api/getdata`
    const token = localStorage.getItem("token")
    async function fetchData() {
        const result = await axios.get(api, {
            headers: { Authorization: token }
        })
        setUser(result.data.email)
    }
    useEffect(() => {
        fetchData()
    }, [])
    const logout = () => {
        localStorage.removeItem('token')
        setUser(null)
        navigate('/')
    }
    console.log(user)
    return (
        <div className='flex gap-10 justify-end p-10 relative'>
            {user && <button onClick={() => { navigate('/workoutplan') }}><p>Start Workout</p></button>}
            {user && <button onClick={() => { navigate('/updatedata') }}><p>Update details</p></button>}
            {user && <button onClick={() => { navigate('/workoutplan') }}><p>Get workout plan</p></button>}
            {user && <button onClick={() => { navigate("/profile") }}><p>{user}</p></button>}
            {user ?
                <button onClick={logout}><p>Logout</p></button>
                :
                <div className='flex gap-10'>
                    <button onClick={() => { navigate('/login') }}><p>Login</p></button>
                    <button onClick={() => { navigate('/signup') }}><p>Signup</p></button>
                </div>}
        </div>
    )
}

export default Home
