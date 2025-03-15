import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { IoFitnessOutline } from "react-icons/io5";
import { demo } from './assets/demo'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastOpt } from "./assets/ToastOpt"
import { motion } from 'framer-motion'
import { framer } from './assets/framer'

const Startworkout = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [userData, setUserdata] = useState({})
    const plan = location.state || []
    const [count, setCount] = useState(-1)
    const token = localStorage.getItem("token")
    const getapi = demo.getdata
    const updateapi = demo.update
    async function fetchdata() {
        try {
            const user = await axios.get(getapi, {
                headers: { Authorization: token }
            })
            setUserdata(user.data)
        } catch (error) {
            if (error.response && error.response.status == 401) {
                navigate('/error')
            }
            else {
                toast.error(error.response?.data?.message || "Error, try again later", ToastOpt);
            }
        }
    }
    const handleNext = (given) => {
        setCount(count + 1)
        update({ reward: given })
    }
    const handlePrev = (given) => {
        setCount(count - 1);
        update({ reward: (given * -1) })
    }
    async function update({ reward, count }) {
        try {
            const moddata = { reward, count }
            const userupdate = await axios.post(updateapi, moddata, {
                headers: { Authorization: token }
            })
            if (count == 1) {
                navigate("/profile")
            }
        }
        catch (error) {
            if (error.response && error.response.status == 401) {
                navigate('/error')
            }
            else {
                toast.error(error.response?.data?.message || "Error, try again later", ToastOpt);
            }
        }
    }
    useEffect(() => {
        if (!token) {
            navigate("/");
            return;
        }
        const payload = JSON.parse(atob(token.split(".")[1]));
        const timeLeft = payload.exp * 1000 - Date.now();
        if (timeLeft <= 0) {
            localStorage.removeItem("token");
            navigate("/");
        } else {
            setTimeout(() => {
                localStorage.removeItem("token");
                navigate("/");
            }, timeLeft);
        }
        fetchdata();
        update({ reward: 50 });
    }, [navigate, token]);
    return (
        <motion.div initial="hidden" animate="visible" className='bg-gray-950 w-screen h-screen text-white flex flex-col'>
            <motion.div variants={framer.leftouterBoxVariant} className='w-full h-20 bg-gray-950 flex justify-between px-5 md:px-10 py-15'>
                <div className='flex gap-2 md:gap-10 items-center text-2xl md:text-3xl'>
                    <IoFitnessOutline className='size-8 md:size-10 text-green-500' />
                    <h2>Home<span className='text-green-500'>Pulse</span></h2>
                </div>
                <motion.button variants={framer.buttonOnHover} whileHover="hover" onClick={() => { navigate('/') }} className='flex items-center cursor-pointer md:text-2xl'><h4>Back to <span className='text-green-500'>Home</span></h4></motion.button>
            </motion.div>

            {plan.length !== 0 ?
                (<div className='flex flex-col w-full h-full justify-center items-center'>
                    <motion.div variants={framer.innerBoxVariant} className='flex flex-col items-center justify-center p-10 py-15 w-3/4 lg:w-1/2 h-auto border-1 border-green-500 rounded-3xl bg-gray-600 shadow-lg shadow-green-500'>
                        {plan.map((value, index) => (
                            <div key={index}>
                                {count === index && (
                                    <div className='flex flex-col gap-8 md:gap-10 items-center md:text-xl'>
                                        <motion.h2 variants={framer.innerBoxVariant} className='text-center text-green-500 text-xl md:text-2xl'>{value.exercise}</motion.h2>
                                        <motion.h4 variants={framer.innerBoxVariant} className='text-center italic text-xs md:text-xl'>{value.guide}</motion.h4>
                                        <motion.h4 variants={framer.innerBoxVariant}>Repeat this for <span className='text-green-500'>{value.time}</span> times</motion.h4>
                                        <div className='flex w-full justify-evenly md:text-xl'>
                                            <motion.button variants={framer.buttonOnHover} whileHover="hover" className='bg-red-500 p-3 rounded-xl cursor-pointer ' onClick={() => { handlePrev(value.reward) }}><p>Previous</p></motion.button>
                                            <motion.button variants={framer.buttonOnHover} whileHover="hover" className='bg-green-500 p-3 rounded-xl cursor-pointer' onClick={() => { handleNext(value.reward) }}><p>Next</p></motion.button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                        {(count === -1) && (
                            <div className='flex flex-col gap-10 md:gap-20 items-center'>
                                <motion.h2 variants={framer.innerBoxVariant} className='text-xl md:text-2xl'>Lets get <span className='text-green-500'>Started!!!</span></motion.h2>
                                <motion.p variants={framer.innerBoxVariant} className='text-center italic text-xs md:text-xl'>Whether you're here for strength, endurance, or just to feel good, your journey starts NOW. Get up, get moving, and let’s make every workout count!</motion.p>
                                <motion.button variants={framer.buttonOnHover} whileHover="hover" className='bg-green-500 p-2 md:p-3 rounded-xl w-30 cursor-pointer md:text-2xl' onClick={() => { setCount(0) }}><p>Start</p></motion.button>
                            </div>
                        )}
                        {count === plan.length && (
                            <div className='flex flex-col gap-10 items-center px-10 '>
                                <motion.h2 variants={framer.innerBoxVariant} className='text-xl md:text-2xl'>Have You <span className='text-green-500'>Completed?</span></motion.h2>
                                <motion.h4 variants={framer.innerBoxVariant} className='italic text-center flex flex-col text-xs md:text-xl'>
                                    Great job! Keep pushing, keep growing, and remember-
                                    every rep counts
                                </motion.h4>
                                <div className='flex gap-5 md:gap-10 '>
                                    <motion.button variants={framer.buttonOnHover} whileHover="hover" className='bg-red-500 p-2 md:p-3 rounded-xl w-30 cursor-pointer' onClick={() => { setCount(0) }}><p>No</p></motion.button>
                                    <motion.button variants={framer.buttonOnHover} whileHover="hover" className='bg-green-500 p-2 md:p-3 rounded-xl w-30 cursor-pointer' onClick={() => { update({ count: 1, reward: 50 }) }}><p>Yes</p></motion.button>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>) :
                (navigate("/workoutplan"))
            }
            <ToastContainer />
        </motion.div >
    )
}

export default Startworkout
