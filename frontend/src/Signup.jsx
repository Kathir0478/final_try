import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { IoFitnessOutline } from "react-icons/io5"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastOpt } from "./assets/ToastOpt"
import { demo } from './assets/demo'
import { motion } from 'framer-motion'
import { framer } from './assets/framer'


const Signup = () => {
    const navigate = useNavigate();
    const api = demo.signup
    const [confirm, setConfirm] = useState("")
    const [userdata, setUserdata] = useState({ name: "", email: "", password: "" })
    const token = localStorage.getItem("token")
    const handleChange = (event) => {
        if (event.target.name === 'confirm') {
            setConfirm(event.target.value)
        }
        else {
            setUserdata({ ...userdata, [event.target.name]: event.target.value })
        }
    }

    useEffect(() => {
        if (token) {
            navigate("/")
        }
    }, [token])

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (userdata.name.length < 4) {
            toast.error("The name must be of valid length between 4 and 20", ToastOpt)
            return
        }
        if (userdata.password.length < 4) {
            toast.error("Provide a stronger password", ToastOpt)
            return
        }
        if (confirm !== userdata.password) {
            toast.error("Password doesn't match", ToastOpt)
            setConfirm("")
            return
        }
        try {
            const result = await axios.post(api, userdata)
            localStorage.setItem("token", result.data.token)
            toast.success("Signup Successfull", ToastOpt)
            setTimeout(() => {
                navigate('/setdata')
            }, 1000);

        }
        catch (error) {
            toast.error(error.response?.data?.message || "Error signing up, try again later", ToastOpt);
        }
    }

    const handleReset = () => {
        setUserdata({ name: "", email: "", password: "" })
        setConfirm("")
    }
    return (
        <motion.div initial="hidden" animate="visible" className='flex justify-center items-center bg-gray-950 h-full min-h-screen w-screen text-white'>
            <motion.div variants={framer.outerBoxVariant} className='flex flex-col gap-10 border-green-500 border-2 rounded-lg p-8 md:p-16 shadow-lg shadow-green-500 items-center bg-gray-600'>
                <motion.h1 variants={framer.innerBoxVariant} className='w-full justify-center flex text-3xl md:text-4xl'>Home<span className='flex items-center text-green-500 gap-5'>Pulse<IoFitnessOutline className='size-6 md:size-10' /></span></motion.h1>
                <motion.h2 variants={framer.innerBoxVariant} className='text-2xl md:text-3xl'>Signup</motion.h2>
                <motion.form variants={framer.innerBoxVariant} onSubmit={handleSubmit} className='flex flex-col items-center gap-5'>
                    <div className='flex gap-5 items-center'>
                        <p className='w-20 text-right italic'>Name: </p>
                        <input type='text' placeholder='User' name='name' value={userdata.name} onChange={handleChange} className='p-2 md:text-xl border-green-500 border-1 rounded-xl bg-gray-950 justify-center' />
                    </div>
                    <div className='flex gap-5 items-center'>
                        <p className='w-20 text-right italic'>Email: </p>
                        <input type='email' placeholder='User@gmail.com' name='email' value={userdata.email} onChange={handleChange} className='p-2 md:text-xl border-green-500 border-1 rounded-xl bg-gray-950 justify-center' />
                    </div>
                    <div className='flex gap-5 items-center'>
                        <p className='w-20 text-right italic'>Password: </p>
                        <input type='password' placeholder='******' name='password' value={userdata.password} onChange={handleChange} className='md:text-xl border-green-500 border-1 rounded-xl bg-gray-950 p-2 justify-center' />
                    </div>
                    <div className='flex gap-5 items-center'>
                        <p className='w-20 text-right italic'>Confirm Password:</p>
                        <input type='password' placeholder='******' name='confirm' value={confirm} onChange={handleChange} className='md:text-xl border-green-500 border-1 rounded-xl bg-gray-950 p-2 justify-center' />
                    </div>
                    <div className='flex justify-around w-full p-5 md:text-xl'>
                        <motion.button variants={framer.buttonOnHover} whileHover="hover" type='submit'><h4 className='text-green-500 cursor-pointer'>Submit</h4></motion.button>
                        <motion.button variants={framer.buttonOnHover} whileHover="hover" onClick={handleReset}><h4 className='cursor-pointer '>Reset</h4></motion.button>
                    </div>
                    <p className='md:text-xl'>Already have an account? <Link to='/login' className='text-green-500 font-bold italic text-xl'>Login</Link></p>
                </motion.form>
            </motion.div>
            <ToastContainer />
        </motion.div>
    )
}

export default Signup
