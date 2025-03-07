import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { IoFitnessOutline } from "react-icons/io5"

const Signup = () => {
    const navigate = useNavigate();
    const base_api = "https://final-try-backend.onrender.com"
    const api = `${base_api}/api/signup`
    const [confirm, setConfirm] = useState("")
    const [userdata, setUserdata] = useState({ name: "", email: "", password: "" })
    const handleChange = (event) => {
        if (event.target.name === 'confirm') {
            setConfirm(event.target.value)
        }
        else {
            setUserdata({ ...userdata, [event.target.name]: event.target.value })
        }
    }
    const handleSubmit = async (event) => {
        if (confirm === userdata.password) {
            try {
                event.preventDefault()
                const result = await axios.post(api, userdata)
                localStorage.setItem("token", result.data.token)
                navigate('/setdata')
            }
            catch (error) {
                alert(error.response.data.message)
                navigate('/login')
            }
        }
        else {
            event.preventDefault()
            alert("Password doesn't match")
            setConfirm("")
        }
    }
    const handleReset = () => {
        setUserdata({ name: "", email: "", password: "" })
        setConfirm("")
    }
    return (
        <div className='flex justify-center items-center bg-gray-950 h-screen w-screen text-white'>
            <div className='flex flex-col gap-10 border-green-500 border-5 rounded-lg p-20 px-30 shadow-lg shadow-green-500 items-center'>
                <h1 className='flex'>Home<span className='flex items-center text-green-500 gap-5'>Pulse<IoFitnessOutline /></span></h1>
                <h2>Signup</h2>
                <form onSubmit={handleSubmit} className='flex flex-col items-center gap-10'>
                    <div className='flex gap-5 items-center'>
                        <p className='text-green-500 w-24 text-right'>Name: </p>
                        <input type='text' placeholder='User' name='name' value={userdata.name} onChange={handleChange} className='text-xl border-green-500 border-2 rounded-lg p-2 shadow-lg shadow-green-500 justify-center' required />
                    </div>
                    <div className='flex gap-5 items-center'>
                        <p className='text-green-500 w-24 text-right'>Email: </p>
                        <input type='email' placeholder='User@gmail.com' name='email' value={userdata.email} onChange={handleChange} className='text-xl border-green-500 border-2 rounded-lg p-2 shadow-lg shadow-green-500 justify-center' required />
                    </div>
                    <div className='flex gap-5 items-center'>
                        <p className='text-green-500 w-24 text-right'>Password: </p>
                        <input type='password' placeholder='******' name='password' value={userdata.password} onChange={handleChange} className='text-xl border-green-500 border-2 rounded-lg p-2 shadow-lg shadow-green-500 justify-center' required />
                    </div>
                    <div className='flex gap-5 items-center'>
                        <p className='text-green-500 w-24 text-right'>Confirm Password:</p>
                        <input type='password' placeholder='******' name='confirm' value={confirm} onChange={handleChange} className='text-xl border-green-500 border-2 rounded-lg p-2 shadow-lg shadow-green-500 justify-center' required />
                    </div>
                    <div className='flex justify-around w-full p-5'>
                        <button type='submit'><h4 className='text-green-500 cursor-pointer'>Submit</h4></button>
                        <button onClick={handleReset}><h4 className='cursor-pointer'>Reset</h4></button>
                    </div>
                    <p>Already have an account? <Link to='/login' className='text-green-500 font-bold'>Login</Link></p>
                </form>
            </div>
        </div>
    )
}

export default Signup
