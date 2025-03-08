import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { IoFitnessOutline } from "react-icons/io5"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastOpt } from "./assets/ToastOpt"
import { demo } from './assets/demo'

const Login = () => {
    const navigate = useNavigate();
    const api = demo.login
    const [userdata, setUserdata] = useState({ email: "", password: "" })
    const token = localStorage.getItem("token")
    useEffect(() => {
        if (token) {
            navigate("/")
        }
    }, [token])

    const handleChange = (event) => {
        setUserdata({ ...userdata, [event.target.name]: event.target.value })
    }
    const handleSubmit = async (event) => {
        try {
            event.preventDefault()
            if (!userdata.email) {
                toast.error("Kinldy Provide valid email", ToastOpt)
                return;
            }
            if (userdata.password.length < 4) {
                toast.error("Kindly provide valid password", ToastOpt)
                return;
            }
            const result = await axios.post(api, userdata)
            localStorage.setItem("token", result.data.token)
            toast.success("Login Successfull", ToastOpt)
            setTimeout(() => {
                navigate('/')
            }, 1000)
        }
        catch (error) {
            toast.error(error.response?.data?.message || "Error logging in, try again later", ToastOpt);
        }
    }
    const handleReset = () => {
        setUserdata({ email: "", password: "" })
    }
    return (
        <div className='flex justify-center items-center bg-gray-950 h-screen w-screen text-white'>
            <div className='flex flex-col gap-10 border-green-500 border-2 rounded-lg p-16  shadow-lg shadow-green-500 items-center bg-gray-600' >
                <h1 className='flex'>Home<span className='flex items-center text-green-500 gap-5'>Pulse<IoFitnessOutline /></span></h1>
                <h2>Login</h2>
                <form onSubmit={handleSubmit} className='flex flex-col items-center'>
                    <div className='flex flex-col gap-5 w-full'>
                        <div className='flex gap-5 items-center p-5'>
                            <p className='text-green-500 w-24 text-right italic'>Email:</p>
                            <input type='email' placeholder='user@gmail.com' name='email' value={userdata.email} onChange={handleChange} className='text-xl border-green-500 border-1 rounded-xl p-2 justify-center bg-gray-950' />
                        </div>
                        <div className='flex gap-5 items-center p-5'>
                            <p className='text-green-500 w-24 text-right italic'>Password:</p>
                            <input type='password' placeholder='******' name='password' value={userdata.password} onChange={handleChange} className='text-xl border-green-500 border-1 rounded-xl bg-gray-950 p-2 justify-center' />
                        </div>
                    </div>

                    <div className='flex justify-around w-full p-10'>
                        <button type='submit'><h4 className='text-green-500 cursor-pointer'>Submit</h4></button>
                        <button onClick={handleReset}><h4 className='cursor-pointer'>Reset</h4></button>
                    </div>
                    <p>Don't have an account? <Link to="/signup" className='text-green-500 font-bold italic'>Sign up</Link></p>
                </form>
            </div >
            <ToastContainer />
        </div >
    )
}

export default Login


