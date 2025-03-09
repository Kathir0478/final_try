import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IoFitnessOutline } from "react-icons/io5";
import { demo } from './assets/demo'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastOpt } from "./assets/ToastOpt"
import { motion } from 'framer-motion'
import { framer } from './assets/framer'


const Card = ({ day, plan, index, selected, setSelected }) => {
    const navigate = useNavigate()
    return (
        <div className='flex flex-col gap-5 p-10 bg-gray-600 rounded-3xl'>
            <div className='flex justify-between w-full'>
                <h2 className='text-green-500'>{day}</h2>
                <motion.button variants={framer.buttonOnHover} whileHover="hover" onClick={() => setSelected(index)} className='bg-green-500 rounded-lg w-30 cursor-pointer'>
                    {selected === index ? <span onClick={() => { navigate('/session', { state: plan }) }}>Select</span> : "View"}
                </motion.button>
            </div>
            <div className={`flex flex-col gap-5 `}>
                {selected === index && plan.map((value, idx) => (
                    <motion.div variants={framer.leftouterBoxVariant} key={idx} className='flex flex-col gap-2 px-10 w-full'>
                        <div className='flex justify-between text-green-500'>
                            <h2>{value.exercise}</h2>
                            <h2>{value.time}</h2>
                        </div>
                        <p>{value.guide}</p>
                    </motion.div>
                ))}
            </div>
        </div >
    )
}

const Workouts = () => {
    const navigate = useNavigate()
    const [workouts, setWorkouts] = useState({})
    const [selected, setSelected] = useState(-1)
    const token = localStorage.getItem("token")
    const api = demo.getdata
    const fetchdata = async () => {
        try {
            const user = await axios.get(api, {
                headers: { Authorization: token }
            })
            setWorkouts(user.data.workout_plan)
        }
        catch (error) {
            if (error.response && error.response.status == 401) {
                navigate('/error')
            }
            else {
                toast.error(error.response?.data?.message || "Please Try again later", ToastOpt);
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
    }, [navigate, token]);
    const handleSelect = (index) => {
        setSelected(prev => prev === index ? -1 : index)
    }
    return (
        <motion.div initial="hidden" animate="visible" className='bg-gray-950 h-full min-h-screen w-screen text-white relative bg-fixed flex flex-col'>
            <motion.div variants={framer.outerBoxVariant} className='fixed w-full h-20 bg-gray-950 flex justify-between px-10 py-15 z-10'>
                <div className='flex gap-10 items-center'>
                    <IoFitnessOutline className='size-10 text-green-500' />
                    <h2>Home<span className='text-green-500'>Pulse</span></h2>
                </div>
                <motion.button variants={framer.buttonOnHover} whileHover="hover" onClick={() => { navigate('/') }} className='flex items-center cursor-pointer'><h4>Back to <span className='text-green-500'>Home</span></h4></motion.button>
            </motion.div>
            {(!workouts || Object.keys(workouts).length === 0) ?
                (<motion.div variants={framer.fromBottomVariant} className='flex flex-col items-center gap-10 justify-center h-screen text-white'>
                    <h2 className='text-green-500 '>No Workout Plan Found</h2>
                    <p className='text-white text-center flex flex-col gap-2 leading-relaxed '>
                        <p>It looks like you haven't set up your workout plan yet.</p>
                        <p>Start your fitness journey by filling in your details now!</p>
                    </p>
                    <motion.button variants={framer.buttonOnHover} whileHover="hover" className='px-10 py-4 m-10 bg-green-500 text-white rounded-lg ' onClick={() => navigate('/setdata')}>
                        <p>Fill Your Workout Plan</p>
                    </motion.button>
                </motion.div>) :
                (<div className='flex flex-col-reverse lg:flex-row my-25'>
                    <motion.h2 variants={framer.fromBottomVariant} className='flex italic text-green-500 justify-center lg:hidden'>Let’s get started!</motion.h2>
                    <motion.div variants={framer.leftouterBoxVariant} className='flex flex-col p-20 flex-1 gap-10' >
                        <motion.h2><span className='text-green-500'>Your</span> Workout Plan</motion.h2>
                        <div className='flex flex-col gap-5'>
                            {Object.entries(workouts).map(([day, exercises], index) => (
                                <motion.div variants={framer.leftinnerBoxVariant} key={index}>
                                    <Card day={day} plan={exercises} index={index} selected={selected} setSelected={handleSelect} />
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                    <div className='flex-1 flex flex-col p-10 px-14 w-full h-screen justify-center items-center'>
                        <motion.div variants={framer.fromRightVariant} className='flex flex-col leading-relaxed lg:fixed w-full lg:w-2/5 '>
                            <div className='flex flex-col p-5'>
                                <h2 className='text-green-500'>Unlock Your Best Self</h2>
                                <h2>One Workout at a Time!</h2>
                            </div>
                            <p className='p-5'>Every journey begins with a decision—to show up, to put in the effort, and to become better than yesterday. This workout plan is not just a routine; it's a step toward a stronger, healthier, and more confident YOU. </p>
                            <h2 className='hidden lg:flex italic text-green-500 p-5 py-20 text-center'>Let’s get started!</h2>
                        </motion.div>
                    </div>
                </div>)}
            <ToastContainer />
        </motion.div >
    )
}

export default Workouts

