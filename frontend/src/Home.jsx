import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IoFitnessOutline } from "react-icons/io5";
import { FaBarsProgress, FaCircleQuestion } from "react-icons/fa6";
import { MdMenuOpen } from "react-icons/md";
import { demo } from './assets/demo'
import { motion, AnimatePresence } from 'framer-motion'
import { framer } from './assets/framer'

const Home = () => {
    const [showout, setShowout] = useState(false)
    const [open, setOpen] = useState(false)
    const [user, setUser] = useState("")
    const navigate = useNavigate()
    const api = demo.getdata
    const token = localStorage.getItem("token")
    async function fetchData() {
        const result = await axios.get(api, {
            headers: { Authorization: token }
        })
        setUser(result.data.email)
    }
    useEffect(() => {
        if (!token) {
            setUser("");
            return;
        }
        const payload = JSON.parse(atob(token.split(".")[1]));
        const timeLeft = payload.exp * 1000 - Date.now();
        if (timeLeft <= 0) {
            localStorage.removeItem("token");
            setUser("")
            return;
        } else {
            setTimeout(() => {
                localStorage.removeItem("token");
                setUser("")
            }, timeLeft);
        }
        fetchData();
    }, [navigate, token]);
    const logout = () => {
        setShowout(false)
        localStorage.removeItem('token')
        setUser(null)
        navigate('/')
    }
    const handleout = () => {
        setShowout(!showout)
        setOpen(false)
    }
    const handleopen = () => {
        if (!showout) {
            setOpen(!open)
        }
    }
    return (
        <motion.div initial="hidden" animate="visible" className="relative flex flex-col gap-20 h-full min-h-screen text-white bg-gray-950 items-center">
            <div className='fixed flex w-full bg-gray-950 text-green-500 justify-end z-10 lg:hidden'>
                <motion.button variants={framer.buttonOnHover} initial="hidden" animate="visible" whileHover="hover" onClick={handleopen}>
                    <MdMenuOpen className={`size-8 mr-10 my-8 cursor-pointer ${open ? "rotate-90" : "rotate-0"} transition-all duration-500`} />
                </motion.button>
            </div>
            <motion.nav variants={framer.outerBoxVariant} className={`lg:flex justify-center lg:flex-row ${open ? 'flex flex-col top-10 h-screen justify-center p-10' : 'hidden'} items-start fixed lg:top-0 lg:left-0 w-full lg:justify-end gap-10 lg:gap-20 lg:h-30 p-10 z-2 bg-gray-950 text-2xl md:text-xl`}>
                <IoFitnessOutline className='hidden lg:flex size-10 text-green-500' />
                {(user && !showout) && <motion.button variants={framer.buttonOnHover} whileHover="hover" onClick={() => { navigate('/workoutplan') }}><h4 className='cursor-pointer'>Start <span className='text-green-500'>Workout</span></h4></motion.button>}
                {(user && !showout) && <motion.button variants={framer.buttonOnHover} whileHover="hover" onClick={() => { navigate('/updatedata') }}><h4 className='cursor-pointer'>Update <span className='text-green-500'>Details</span></h4></motion.button>}
                {(user && !showout) && <motion.button variants={framer.buttonOnHover} whileHover="hover" onClick={() => { navigate("/profile") }}><h4 className='cursor-pointer'>{user}</h4></motion.button>}
                {user ? (
                    <motion.button variants={framer.buttonOnHover} whileHover="hover" onClick={handleout}><h4 className='text-green-500 cursor-pointer'>Logout</h4></motion.button>
                ) : (
                    <div className='flex flex-col lg:flex-row  gap-20 items-start'>
                        <motion.button variants={framer.buttonOnHover} whileHover="hover" onClick={() => { navigate('/login') }}><h4 className='cursor-pointer'>Login</h4></motion.button>
                        <motion.button variants={framer.buttonOnHover} whileHover="hover" onClick={() => { navigate('/signup') }}><h4 className='text-green-500  cursor-pointer'>Signup</h4></motion.button>
                    </div>
                )}
            </motion.nav>
            <AnimatePresence>
                {
                    showout && (
                        <motion.div variants={framer.enterExitSideVariant} initial="hidden" animate="visible" exit="leave" className="fixed inset-0 flex items-center justify-center bg-gray-950 ">
                            <div className="p-10  gap-10 flex flex-col items-center">
                                <h2 className='text-2xl'>Are you sure you want to <span className='text-green-500'>logout?</span></h2>
                                <div className="flex gap-10 m-4 text-xl">
                                    <motion.button variants={framer.buttonOnHover} whileHover="hover" onClick={logout} className="bg-red-500 px-4 py-2 rounded-md text-white cursor-pointer"><p>Logout</p></motion.button>
                                    <motion.button variants={framer.buttonOnHover} whileHover="hover" onClick={() => setShowout(false)} className="bg-green-500 px-4 py-2 rounded-md text-white cursor-pointer"><p>Cancel</p></motion.button>
                                </div>
                            </div>
                        </motion.div>
                    )
                }
            </AnimatePresence>
            <div className={` ${open ? "hidden" : "flex flex-col"} lg:flex flex-col gap-30 p-5 md:p-40 `}>
                <motion.div variants={framer.enterExitSideVariant} className="mt-20 md:mt-[70px] flex flex-col">
                    <h1 className='flex py-5 text-2xl md:text-3xl'>Home<span className='flex items-center text-green-500 gap-5'>Pulse<IoFitnessOutline /></span></h1>
                    <p className="flex flex-col p-5 leading-relaxed gap-6 md:text-xl">
                        <span>Welcome to <span className='font-bold text-green-500'>HomePulse</span>, your ultimate fitness companion designed to help you stay fit and healthy from the comfort of your home. Whether you're a <span className='font-bold'>beginner</span> or a <span className='font-bold'>seasoned athlete</span>, our app provides <span className='font-bold text-green-500'>personalized workout plans</span>, guided exercises, and expert nutrition tips to help you achieve your fitness goals.</span>
                        <span>At <span className='font-bold text-green-500'>HomePulse</span>, we believe that staying active should be <span className='italic'>simple, accessible, and enjoyable.</span> Our app offers a variety of <span className='font-bold'>home-friendly workouts</span>, ranging from <span className='text-green-500'>strength training and yoga to HIIT and cardio sessions</span>—no gym required! With <span className='font-bold'>real-time progress tracking,</span> AI-driven recommendations, and community support, we make it easier than ever to stay motivated and consistent.</span>
                        <span><span className='font-bold'>Join us today</span> and take control of your fitness journey—because a <span className='text-green-500'>healthier you starts at home!</span></span>
                    </p>
                </motion.div>
                <motion.div variants={framer.enterExitSideVariant} className="flex flex-col leading-relaxed gap-10">
                    <h2 className='flex gap-2 items-center px-5 text-xl md:text-2xl'>Why Choose <span className='text-green-500 flex items-center gap-4'>Us<FaCircleQuestion /></span></h2>
                    <p className="p-5 indent-20 md:text-xl">
                        At <span className='text-green-500 font-bold'>HomePulse</span>, we combine <span className='font-bold'>advanced AI technology</span> with <span className='font-bold'>expert trainer guidance</span> to create workout plans <span className='font-bold'>tailored to your goals</span>
                        Whether you’re aiming to <span className='font-bold'>lose weight, build muscle, or boost endurance</span>, our smart, adaptive workouts ensure <span className='font-bold'>maximum results with minimal hassle</span>—all from the comfort of your home!
                    </p>
                    <div className="flex flex-col md:flex-row justify-evenly w-full gap-10 text-balance md:text-xl">
                        <ul className="flex flex-col gap-4 indent-5">
                            <li><p>AI-powered personalized plans</p></li>
                            <li><p>Expert trainer-backed workouts</p></li>
                            <li><p>Real-time adjustments</p></li>
                            <li><p>Fun, effective, and injury-free training</p></li>
                        </ul>
                        <div className="flex justify-center">
                            <motion.button variants={framer.buttonOnHover} whileHover="hover" onClick={() => { navigate("workoutplan") }}>
                                <p className="border-1 p-4 rounded-xl border-green-500 shadow-lg shadow-green-500 cursor-pointer">Start Your Workout <span className='text-green-500'>Now</span></p>
                            </motion.button>
                        </div>
                    </div>
                </motion.div>
                <motion.div variants={framer.enterExitSideVariant} className='flex flex-col leading-relaxed gap-5 md:gap-10'>
                    <h2 className='flex flex-col md:flex-row  pl-5 gap-3 text-xl md:text-2xl'>
                        <span className='text-green-500'>Track Your Progress</span>
                        <span className='flex gap-2 items-center'>Like Never Before <FaBarsProgress className='text-green-500' /></span>
                    </h2>
                    <p className='flex flex-col gap-2 md:text-xl px-5'>
                        <span>Stay motivated and achieve your fitness goals with <span className='text-green-500 font-bold'>real-time progress tracking</span> on <span className='text-green-500 font-bold'>HomePulse!</span></span>
                    </p>
                    <p className='px-5 md:text-xl'> Our advanced tracking system lets you:</p>
                    <ul className='flex flex-col gap-5 px-8 md:text-xl'>
                        <li>
                            <p className='flex flex-col md:flex-row gap-2'>
                                <span className='text-green-500 font-bold md:w-1/3'>Stay Accountable</span>
                                <span className='md:w-2/3'> Sync your progress with reminders and weekly reports.</span>
                            </p>
                        </li>
                        <li>
                            <p className='flex flex-col md:flex-row gap-2'>
                                <span className='text-green-500 font-bold md:w-1/3'>Track Your Transformations</span>
                                <span className='md:w-2/3'>Visualize your progress with weight, body measurements, and fitness level updates.</span>
                            </p>
                        </li>
                        <li>
                            <p className='flex flex-col md:flex-row gap-2'>
                                <span className='text-green-500 font-bold md:w-1/3'>Monitor Your Workouts</span>
                                <span className='md:w-2/3'>Keep a detailed log of your exercises, sets, reps, and calories burned.</span>
                            </p>
                        </li>
                    </ul>
                </motion.div>
                <motion.div variants={framer.enterExitSideVariant} className='flex flex-col leading-relaxed '>
                    <h2 className='text-xl md:text-2xl flex flex-col md:flex-row'>
                        <span className='indent-5'>Get Your Personalized</span>
                        <span className='text-green-500 indent-40 md:indent-4'>Workout Plan!</span>
                    </h2>
                    <div className='flex flex-col gap-10 lg:flex-row p-5 md:p-10 space-x-50 md:text-xl'>
                        <div className='w-full flex flex-col gap-8 lg:flex-3/4'>
                            <p><span className='text-green-500'>Your fitness journey starts here! </span> To create a customized workout plan that perfectly suits your goals, we need a few details from you.</p>
                            <p>Whether you’re looking to lose weight, build muscle, increase strength, or improve endurance, a <span className='text-green-500'>personalized workout plan</span> is the key to success.</p>
                            <p> Instead of following generic routines that may not work for your body type or lifestyle, a customized plan will help you stay consistent, motivated, and on track toward your fitness aspirations.</p>
                        </div>
                        <div className='lg:flex-1/4 flex items-center justify-center' >
                            <motion.button variants={framer.buttonOnHover} whileHover="hover" onClick={() => { navigate("/updatedata") }}>
                                <p className="border-1 p-5 mt-8 rounded-xl border-green-500 shadow-lg shadow-green-500 cursor-pointer">{user ? "Update Your Data" : "Set Your Data"}</p>
                            </motion.button>
                        </div>
                    </div>
                </motion.div>
                <motion.h3 variants={framer.enterExitSideVariant} className='flex flex-col items-center pb-10 text-center text-xl md:text-2xl gap-2'>
                    <p className='text-green-500 italic font-bold'>Your body achieves what your mind believes.</p>
                    <p className='italic font-bold'>Start your fitness journey today one rep at a time!</p>
                </motion.h3>
            </div>
        </motion.div >
    )
}

export default Home
