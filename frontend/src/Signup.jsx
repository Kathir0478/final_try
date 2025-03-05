import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const Signup = () => {
    const navigate = useNavigate();
    const base_api="https://final-try-backend.onrender.com"
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
        <div className='flex flex-col justify-center gap-10 items-center w-screen h-screen'>
            <h1>Signup</h1>
            <form onSubmit={handleSubmit} className='flex flex-col justify-around h-120 border-3 rounded-lg p-20 border-sky-400 required:border-red-500'>
                <p><input type='text' placeholder='Name' name='name' value={userdata.name} onChange={handleChange} className='p-2 outline-none focus:ring-2 focus:ring-blue-400 rounded-lg' required /></p>
                <p><input type='email' placeholder='Email' name='email' value={userdata.email} onChange={handleChange} className='p-2 outline-none focus:ring-2 focus:ring-blue-400 rounded-lg' required /></p>
                <p><input type='password' placeholder='Password' name='password' value={userdata.password} onChange={handleChange} className='p-2 outline-none focus:ring-2 focus:ring-blue-400 rounded-lg' required /></p>
                <p><input type='password' placeholder='Enter Password again' name='confirm' value={confirm} onChange={handleChange} className='p-2 outline-none focus:ring-2 focus:ring-blue-400 rounded-lg' required /></p>
                <div className='flex w-full justify-between p-2'>
                    <button type='submit' className='border-sky-400 border-2 p-2 rounded-lg'>Submit</button>
                    <button onClick={handleReset} className='border-sky-400 border-2 p-2 rounded-lg'>Reset</button>
                </div>
                <p>Already have an account? <Link to='/login'>Login</Link></p>
            </form>
        </div>
    )
}

export default Signup
