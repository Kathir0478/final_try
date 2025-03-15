import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IoFitnessOutline } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastOpt } from "./assets/ToastOpt"
import { demo } from './assets/demo'
import { motion } from 'framer-motion'
import { framer } from './assets/framer'

const Updatedata = () => {
    const navigate = useNavigate()
    const getapi = demo.getdata
    const setapi = demo.setdata
    const [userdata, setUserdata] = useState(null)
    const [moddata, setmoddata] = useState({ name: "", age: 0, height: 0, weight: 0, fitlevel: "", goal: "", frequency: 0, description: "" })
    const token = localStorage.getItem("token")
    const [loading, setLoading] = useState(false)
    async function fetchdata() {
        try {
            const user = await axios.get(getapi, {
                headers: { Authorization: token }
            })
            if (!user.data.workout_plan) {
                navigate("/setdata")
            }
            setUserdata(user.data)
            setmoddata(user.data)
        } catch (error) {
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
    function validate() {
        if (Number(moddata.age) < 18 || Number(moddata.age) > 100 || !moddata.age) {
            toast.warning("Enter valid age", ToastOpt)
            return false;
        }
        if (Number(moddata.height) < 50 || Number(moddata.height) > 300 || !moddata.height) {
            toast.warning("Enter valid height between 50 and 300 in cm", ToastOpt)
            return false;
        }
        if (Number(moddata.weight) < 20 || Number(moddata.weight) > 300 || !moddata.weight) {
            toast.warning("Enter valid weight between 20 and 300 in Kg", ToastOpt);
            return false;
        }
        if (!moddata.fitlevel) {
            toast.warning("Choose your Current Fitness level", ToastOpt)
            return false;
        }
        if (!moddata.goal) {
            toast.warning("Your goal is required", ToastOpt)
            return false;
        }
        if (Number(moddata.frequency) < 1 || Number(moddata.frequency) > 7 || !moddata.frequency) {
            toast.warning("Enter valid frequency in days per week", ToastOpt);
            return false;
        }
        return true;
    }
    const handleChange = (event) => {
        setmoddata({ ...moddata, [event.target.name]: event.target.value })
    }
    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            if (validate()) {
                toast.success("Data updated succesfully", ToastOpt)
                setLoading(true)
                setTimeout(() => {
                    toast.info("Redirecting Shortly...", ToastOpt)
                }, 5000);
                const user = await axios.post(setapi, moddata, {
                    headers: { Authorization: token }
                })
                setLoading(false)
                navigate('/');
            }
            else {
                return;
            }
        }
        catch (error) {
            toast.error(error.response?.data?.message || "Please Try again later", ToastOpt);
            navigate('/')
        }
    }
    return (
        <motion.div initial="hidden" animate="visible" className='lg:fixed top-0 left-0 w-screen h-full flex flex-col bg-gray-950 text-white'>
            <motion.div variants={framer.outerBoxVariant} className='fixed top-0 left-0 flex justify-between p-10 bg-gray-950 w-full z-10'>
                <div className='flex gap-2 md:gap-10 items-center'>
                    <IoFitnessOutline className='size-8 text-green-500 md:size-10' />
                    <h2 className='text-xl md:text-3xl'>Home<span className='text-green-500'>Pulse</span></h2>
                </div>
                <motion.button variants={framer.buttonOnHover} whileHover="hover" onClick={() => { navigate('/') }} className='cursor-pointer'><h4 className=' md:text-2xl'>Back to <span className='text-green-500'>Home</span></h4></motion.button>
            </motion.div>
            {loading && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-500"></div>
                </div>
            )}
            {userdata && (
                <form onSubmit={handleSubmit} className='mt-25 px-5 pt-10 pb-20 lg:p-10 lg:mt-25 flex flex-col-reverse lg:flex-row items-center gap-5 lg:px-40 '>
                    <motion.h4 variants={framer.fromBottomVariant} className='flex flex-col w-full text-center lg:hidden py-14 px-5 text-2xl'>
                        <span className='text-green-500'>Take control of your fitness journey! </span> Update details to get the best results.
                    </motion.h4>
                    <motion.div variants={framer.fromLeftVariant} className='flex-1 border-green-500 border-1 rounded-lg p-5 bg-gray-600 shadow-lg shadow-green-500'>
                        <div className='flex flex-col gap-3 '>
                            <div className='flex gap-5 items-center'>
                                <p className='w-48 italic'>Name<span className='text-red-500'>*</span> </p>
                                <input type='text' placeholder={userdata.name} name='name' value={moddata.name} onChange={handleChange} className='border-1 rounded-lg border-green-500 p-2 pl-5 w-full  bg-gray-950' />
                            </div>
                            <div className='flex gap-5 items-center'>
                                <p className='w-48 italic'>Age<span className='text-red-500'>*</span> </p>
                                <input type='number' placeholder={userdata.age} name='age' value={moddata.age} onChange={handleChange} className='bg-gray-950 border-1 rounded-lg border-green-500 p-2 pl-5  w-full appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none' />
                            </div>
                            <div className='flex gap-5 items-center'>
                                <p className='w-48 italic'>Height<span className='text-red-500'>*</span> </p>
                                <input type='number' placeholder={userdata.height} name='height' value={moddata.height} onChange={handleChange} className='bg-gray-950 border-1 rounded-lg border-green-500 p-2 pl-5 w-full appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none' />
                            </div>
                            <div className='flex gap-5 items-center'>
                                <p className='w-48 italic'>weight<span className='text-red-500'>*</span> </p>
                                <input type='number' placeholder={userdata.weight} name='weight' value={moddata.weight} onChange={handleChange} className='bg-gray-950 border-1 rounded-lg border-green-500 p-2 pl-5 w-full appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none' />
                            </div>
                            <div className='flex gap-5 items-center'>
                                <p className='w-48 italic'>Fitness Level<span className='text-red-500'>*</span> </p>
                                <label className='border-1 rounded-lg border-green-500 p-2 pl-5 bg-gray-950 w-full'>
                                    <select name='fitlevel' value={moddata.fitlevel} onChange={handleChange} className='w-full outline-none bg-gray-950'>
                                        <option value="">{userdata.fitlevel}</option>
                                        <option value="Beginner">Beginner</option>
                                        <option value="Intermediate">Intermediate</option>
                                        <option value="Advanced">Advanced</option>
                                    </select>
                                </label>
                            </div>
                            <div className='flex gap-5 items-center'>
                                <p className='w-48 italic'>Goal<span className='text-red-500'>*</span> </p>
                                <label className='border-1 rounded-lg border-green-500 p-2 pl-5 w-full bg-gray-950'>
                                    <select name='goal' value={moddata.goal} onChange={handleChange} className='w-full bg-gray-950 outline-none'>
                                        <option value="">{userdata.goal}</option>
                                        <option value="General Fitness">General Fitness</option>
                                        <option value="Muscle Building">Muscle Building</option>
                                        <option value="Weight Loss">Weight Loss</option>
                                        <option value="Flexibility Mobility">Flexibility & Mobility</option>
                                        <option value="Cardio Endurance">Cardiovascular Endurance</option>
                                        <option value="Mental Wellbeing">Mental Well-being</option>
                                    </select>
                                </label>
                            </div>
                            <div className='flex gap-5 items-center'>
                                <p className='w-48 italic'>Frequency<span className='text-red-500'>*</span> </p>
                                <input type='number' placeholder={moddata.frequency} name='frequency' value={moddata.frequency} onChange={handleChange} className='bg-gray-950 border-1 rounded-lg border-green-500 p-2 w-full pl-5 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none' />
                            </div>
                            <div className='flex gap-5 items-center'>
                                <p className='w-48 italic'>Description </p>
                                <textarea className='bg-gray-950 border-1 h-20 rounded-lg border-green-500 p-2 w-full pl-5 resize-none' name='description' value={moddata.description} onChange={handleChange} />
                            </div>
                        </div>
                        <div className='flex gap-20 w-full justify-evenly pt-5 md:pt-10'>
                            <motion.button variants={framer.buttonOnHover} whileHover="hover" type='submit' className='rounded-xl p-3 md:p-4 md:py-3 bg-green-500 cursor-pointer'><p>Update</p></motion.button>
                            <motion.button variants={framer.buttonOnHover} whileHover="hover" type='button' onClick={() => { navigate("/workoutplan") }} className='rounded-xl px-3 md:p-4 md:py-3 bg-green-500 cursor-pointer'><p>Start Workout</p></motion.button>
                        </div>
                    </motion.div>
                    <motion.div variants={framer.fromRightVariant} className='flex-1 flex flex-col p-10 px-5 gap-10 md:text-xl'>
                        <h2 className='flex flex-col'><span className='text-green-500'>Update Your Details & </span><span>Keep Your Fitness Plan on Track!</span> </h2>
                        <p>
                            Your fitness journey evolves, and so should your workout plan! Keep your goals aligned with your progress by updating your details. By refreshing your information, you’ll ensure that your fitness plan stays accurate and effective.
                        </p>
                        <ul className='flex flex-col gap-3'>
                            <li><p>Get workouts that match your current fitness level</p></li>
                            <li><p>Adjust your plan based on your progress & new goals</p></li>
                            <li><p>Stay on track with personalized recommendations</p></li>
                        </ul>
                        <h4 className='hidden lg:flex flex-col w-full text-center text-2xl'>
                            <span className='text-green-500 '>Take control of your fitness journey! </span> Update details to get the best results.
                        </h4>
                    </motion.div>
                </form>
            )}
            <ToastContainer />
        </motion.div >
    )
}

export default Updatedata
