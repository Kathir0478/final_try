import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IoFitnessOutline } from "react-icons/io5";
import { FaBarsProgress, FaCircleQuestion } from "react-icons/fa6";
import { MdMenuOpen } from "react-icons/md";
import { demo } from './assets/demo'

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
        <div className="relative flex flex-col gap-20 h-full min-h-screen text-white bg-gray-950 items-center">
            <div className='fixed flex w-full bg-gray-950 text-green-500 justify-end z-10 lg:hidden'>
                <button onClick={handleopen}>
                    <MdMenuOpen className='size-12 mr-10 my-8 cursor-pointer' />
                </button>
            </div>
            <nav className={`lg:flex lg:flex-row ${open ? 'flex flex-col top-10 h-screen justify-center left-1/3' : 'hidden'} items-start fixed lg:top-0 lg:left-0 w-full lg:justify-end gap-10 lg:gap-20 lg:h-30 p-10 z-2 bg-gray-950`}>
                <IoFitnessOutline className='hidden lg:flex size-10 text-green-500' />
                {user && <button onClick={() => { navigate('/workoutplan') }}><h4 className='cursor-pointer'>Start <span className='text-green-500'>Workout</span></h4></button>}
                {user && <button onClick={() => { navigate('/updatedata') }}><h4 className='cursor-pointer'>Update <span className='text-green-500'>Details</span></h4></button>}
                {user && <button onClick={() => { navigate("/profile") }}><h4 className='cursor-pointer'>{user}</h4></button>}
                {user ? (
                    <button onClick={handleout}><h4 className='text-green-500 cursor-pointer'>Logout</h4></button>
                ) : (
                    <div className='flex flex-col lg:flex-row  gap-10 items-start lg:gap-20'>
                        <button onClick={() => { navigate('/login') }}><h4 className='cursor-pointer'>Login</h4></button>
                        <button onClick={() => { navigate('/signup') }}><h4 className='text-green-500  cursor-pointer'>Signup</h4></button>
                    </div>
                )}
            </nav>
            {
                showout && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-950 ">
                        <div className="p-10  gap-10 flex flex-col items-center">
                            <h2 className=''>Are you sure you want to <span className='text-green-500'>logout?</span></h2>
                            <div className="flex gap-10 m-4">
                                <button onClick={logout} className="bg-red-500 px-4 py-2 rounded-md text-white cursor-pointer"><p>Logout</p></button>
                                <button onClick={() => setShowout(false)} className="bg-green-500 px-4 py-2 rounded-md text-white cursor-pointer"><p>Cancel</p></button>
                            </div>
                        </div>
                    </div>
                )
            }
            <div className={` ${open ? "hidden" : "flex flex-col"} lg:flex flex-col gap-30 my-20 w-3/4`}>
                <div className="mt-[70px] flex flex-col">
                    <h1 className='flex py-5'>Home<span className='flex items-center text-green-500 gap-5'>Pulse<IoFitnessOutline /></span></h1>
                    <p className="flex flex-col p-6 leading-relaxed gap-6 text-balance ">
                        <span>Welcome to <span className='font-bold text-green-500'>HomePulse</span>, your ultimate fitness companion designed to help you stay fit and healthy from the comfort of your home. Whether you're a <span className='font-bold'>beginner</span> or a <span className='font-bold'>seasoned athlete</span>, our app provides <span className='font-bold text-green-500'>personalized workout plans</span>, guided exercises, and expert nutrition tips to help you achieve your fitness goals.</span>
                        <span>At <span className='font-bold text-green-500'>HomePulse</span>, we believe that staying active should be <span className='italic'>simple, accessible, and enjoyable.</span> Our app offers a variety of <span className='font-bold'>home-friendly workouts</span>, ranging from <span className='text-green-500'>strength training and yoga to HIIT and cardio sessions</span>—no gym required! With <span className='font-bold'>real-time progress tracking,</span> AI-driven recommendations, and community support, we make it easier than ever to stay motivated and consistent.</span>
                        <span><span className='font-bold'>Join us today</span> and take control of your fitness journey—because a <span className='text-green-500'>healthier you starts at home!</span></span>
                    </p>
                </div>

                <div className="flex flex-col leading-relaxed">
                    <h2 className='flex gap-2 items-center'>Why Choose <span className='text-green-500 flex items-center gap-4'>Us<FaCircleQuestion /></span></h2>
                    <p className="p-10 indent-20 text-balance ">
                        At <span className='text-green-500 font-bold'>HomePulse</span>, we combine <span className='font-bold'>advanced AI technology</span> with <span className='font-bold'>expert trainer guidance</span> to create workout plans <span className='font-bold'>tailored to your goals</span>
                        Whether you’re aiming to <span className='font-bold'>lose weight, build muscle, or boost endurance</span>, our smart, adaptive workouts ensure <span className='font-bold'>maximum results with minimal hassle</span>—all from the comfort of your home!
                    </p>
                    <div className="flex justify-evenly w-full gap-6 text-balance">
                        <ul className="flex flex-col gap-4 indent-10">
                            <li><p>AI-powered personalized plans</p></li>
                            <li><p>Expert trainer-backed workouts</p></li>
                            <li><p>Real-time adjustments</p></li>
                            <li><p>Fun, effective, and injury-free training</p></li>
                        </ul>
                        <div className="flex justify-center">
                            <button onClick={() => { navigate("workoutplan") }}>
                                <p className="border-1 p-4 rounded-xl border-green-500 shadow-lg shadow-green-500 cursor-pointer">Start Your Workout <span className='text-green-500'>Now</span></p>
                            </button>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col leading-relaxed text-balance'>
                    <h2 className='flex items-center gap-3'><span className='text-green-500'>Track Your Progress</span>Like Never Before <FaBarsProgress className='text-green-500' /></h2>
                    <p className=' flex flex-col gap-2 p-10'>
                        <span>Stay motivated and achieve your fitness goals with <span className='text-green-500 font-bold'>real-time progress tracking</span> on <span className='text-green-500 font-bold'>HomePulse!</span></span>
                    </p>
                    <p className='px-10 py-4'> Our advanced tracking system lets you:</p>
                    <ul className='flex flex-col gap-2 px-10  text-balance'>
                        <li><p><span className='text-green-500 font-bold'>Stay Accountable</span> Sync your progress with reminders and weekly reports.</p></li>
                        <li><p><span className='text-green-500 font-bold'>Track Your Transformations</span> Visualize your progress with weight, body measurements, and fitness level updates.</p></li>
                        <li><p><span className='text-green-500 font-bold'>Monitor Your Workouts</span> Keep a detailed log of your exercises, sets, reps, and calories burned.</p></li>
                    </ul>
                </div>
                <div className='flex flex-col leading-relaxed'>
                    <h2>
                        Get Your Personalized <span className='text-green-500'>Workout Plan!</span>
                    </h2>
                    <div className='flex flex-col gap-10 lg:flex-row p-10 space-x-50'>
                        <div className='w-full flex flex-col gap-4 lg:flex-3/4'>
                            <p><span className='text-green-500'>Your fitness journey starts here! </span> To create a customized workout plan that perfectly suits your goals, we need a few details from you.</p>
                            <p>Whether you’re looking to lose weight, build muscle, increase strength, or improve endurance, a <span className='text-green-500'>personalized workout plan</span> is the key to success.</p>
                            <p> Instead of following generic routines that may not work for your body type or lifestyle, a customized plan will help you stay consistent, motivated, and on track toward your fitness aspirations.</p>
                        </div>
                        <div className='lg:flex-1/4 flex items-center justify-center' >
                            <button onClick={() => { navigate("/updatedata") }}>
                                <p className="border-1 p-4 mt-8 rounded-xl border-green-500 shadow-lg shadow-green-500 cursor-pointer">{user ? "Update Your Data" : "Set Your Data"}</p>
                            </button>
                        </div>
                    </div>
                </div>
                <h4 className='flex flex-col items-center py-10'>
                    <h4 className='text-green-500 italic font-bold'>Your body achieves what your mind believes.</h4>
                    <h4 className='italic font-bold'>Start your fitness journey today—one rep at a time!</h4>
                </h4>
            </div>
        </div >
    )
}

export default Home
