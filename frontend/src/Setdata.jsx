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

const Setdata = () => {
    const navigate = useNavigate()
    const api = demo.setdata
    const verifyapi = demo.verify
    const [moddata, setmoddata] = useState({ age: "", gender: "", height: "", weight: "", fitlevel: "", goal: "", frequency: "", description: "" })
    const token = localStorage.getItem("token")
    const [loading, setLoading] = useState(false)
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
        verify();
    }, [navigate, token]);
    async function verify() {
        try {
            const user = await axios.get(verifyapi, {
                headers: { Authorization: token }
            })
        } catch (error) {
            if (error.response && error.response.status == 403) {
                navigate('/updatedata')
            }
            else {
                toast.error(error.response?.data?.message || "Error setting data, try again later", ToastOpt);
            }
        }
    }
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
        if (!moddata.gender) {
            toast.warning("Choose your Gender", ToastOpt)
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
        event.preventDefault();
        try {
            if (validate()) {
                toast.success("Data submitted succesfully,", ToastOpt)
                setTimeout(() => {
                    setLoading(true);
                    toast.info("Redirecting shortly...", ToastOpt)
                }, 2000)
                console.log("Start")
                console.log(api)
                const response = await axios.post(api, moddata, {
                    headers: { Authorization: token }
                });
                console.log(response.data)
                setLoading(false);
                navigate('/')
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Please try again later", ToastOpt);
        }
    };
    return (
        <motion.div initial="hidden" animate="visible" className=' bg-fixed top-0 left-0 w-full min-w-screen h-full min-h-screen flex flex-col bg-gray-950 text-white'>
            <div>
                <motion.div variants={framer.outerBoxVariant} className='fixed top-0 left-0 flex justify-between py-6 px-10 z-10 bg-gray-950 w-full '>
                    <div className='flex gap-5 md:gap-10 items-center'>
                        <IoFitnessOutline className='size-8 md:size-10 text-green-500' />
                        <h2 className='text-2xl md:text-3xl'>Home<span className='text-green-500'>Pulse</span></h2>
                    </div>
                </motion.div>
                {loading && (
                    <div className="fixed inset-0 bg-gray-950 bg-opacity-75 flex items-center justify-center z-50">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-500"></div>
                    </div>
                )}
                <form onSubmit={handleSubmit} className='lg:fixed flex flex-col-reverse lg:flex-row items-center gap-5 p-10 md:p-20'>
                    <motion.button variants={framer.fromBottomVariant} type='submit' className='flex w-full justify-center lg:hidden p-8'>
                        <motion.p variants={framer.buttonOnHover} whileHover="hover" className='w-fit border-1 rounded-xl border-green-500 p-4 shadow-lg shadow-green-500 cursor-pointer font-bold'>Get Started</motion.p>
                    </motion.button>
                    <motion.div variants={framer.fromLeftVariant} className='flex-1 w-full border-green-500 border-1 rounded-lg p-5 md:p-10 md:pb-10 bg-gray-600 shadow-lg shadow-green-500'>
                        <div variants={framer.fromLeftVariant} className='flex flex-col gap-3 md:gap-6 text-xs p-3'>
                            <div className='flex gap-5 items-center'>
                                <p className='w-50 italic md:text-xl'>Age<span className='text-red-500'>*</span> </p>
                                <input type='number' placeholder="Enter your age" name='age' value={moddata.age} onChange={handleChange} className='bg-gray-950 border-1 rounded-lg border-green-500 p-2 pl-5  w-full appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none' />
                            </div>
                            <div className='flex gap-5 items-center'>
                                <p className='w-50 italic md:text-xl'>Height<span className='text-red-500'>*</span> </p>
                                <input type='number' placeholder="Enter your height(cm)" name='height' value={moddata.height} onChange={handleChange} className='bg-gray-950 border-1 rounded-lg border-green-500 p-2 pl-5 w-full appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none' />
                            </div>
                            <div className='flex gap-5 items-center'>
                                <p className='w-50 italic md:text-xl'>weight<span className='text-red-500'>*</span> </p>
                                <input type='number' placeholder="Enter your weight(kg)" name='weight' value={moddata.weight} onChange={handleChange} className='bg-gray-950 border-1 rounded-lg border-green-500 p-2 pl-5 w-full appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none' />
                            </div>
                            <div className="flex gap-5 items-center">
                                <p className="w-50 italic md:text-xl">Gender<span className='text-red-500'>*</span></p>
                                <div className="border-1 rounded-lg border-green-500 p-2 w-full flex justify-around bg-gray-950">
                                    <label className="flex gap-1">
                                        <input type="radio" name="gender" value="Male" checked={moddata.gender === "Male"} onChange={handleChange} />
                                        Male
                                    </label>
                                    <label className="flex gap-1">
                                        <input type="radio" name="gender" value="Female" checked={moddata.gender === "Female"} onChange={handleChange} />
                                        Female
                                    </label>
                                </div>
                            </div>
                            <div className='flex items-center gap-5'>
                                <p className='w-50 italic md:text-xl'>Fitness Level<span className='text-red-500'>*</span> </p>
                                <label className='bg-gray-950 border-1 rounded-lg border-green-500 p-2 pl-5  w-full'>
                                    <select name='fitlevel' value={moddata.fitlevel} onChange={handleChange} className='w-full outline-none bg-gray-950'>
                                        <option value="">Fitness level</option>
                                        <option value="Beginner">Beginner</option>
                                        <option value="Intermediate">Intermediate</option>
                                        <option value="Advanced">Advanced</option>
                                    </select>
                                </label>
                            </div>
                            <div className='flex items-center gap-5'>
                                <p className='w-50 italic md:text-xl'>Goal<span className='text-red-500'>*</span> </p>
                                <label className='border-1 rounded-lg border-green-500 p-2 pl-5 w-full bg-gray-950'>
                                    <select name='goal' value={moddata.goal} onChange={handleChange} className='w-full bg-gray-950 outline-none'>
                                        <option value="">Your goal</option>
                                        <option value="General Fitness">General Fitness</option>
                                        <option value="Muscle Building">Muscle Building</option>
                                        <option value="Weight Loss">Weight Loss</option>
                                        <option value="Flexibility Mobility">Flexibility & Mobility</option>
                                        <option value="Cardio Endurance">Cardiovascular Endurance</option>
                                        <option value="Mental Wellbeing">Mental Well-being</option>
                                    </select>
                                </label>
                            </div>
                            <div className='flex items-center gap-5'>
                                <p className='w-50 italic md:text-xl'>Frequency<span className='text-red-500'>*</span> </p>
                                <input type='number' placeholder="Days per week" name='frequency' value={moddata.frequency} onChange={handleChange} className='bg-gray-950 border-1 rounded-lg border-green-500 p-2 w-full pl-5 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none' />
                            </div>
                            <div className='flex items-center gap-5'>
                                <p className='w-50 italic md:text-xl'>Description </p>
                                <textarea className='bg-gray-950 h-20 border-1 rounded-lg border-green-500 p-2 w-full pl-5 resize-none' placeholder="Any medical conditions" name='description' value={moddata.description} onChange={handleChange} />
                            </div>
                        </div>
                    </motion.div>
                    <motion.div variants={framer.fromRightVariant} className='flex-1 flex flex-col mt-16 lg:p-10 gap-10 pb-10'>
                        <h2 className='flex flex-col text-xl md:text-2xl'><span className='text-green-500'>Enter Your Details & </span><span>Get Your Perfect Workout Plan!</span> </h2>
                        <p>
                            Unlock a personalized fitness plan tailored to your goals, lifestyle, and fitness level. By entering your details, you’ll get an accurate workout plan that helps you:
                        </p>
                        <ul className='flex flex-col gap-3'>
                            <li><p>Build strength & endurance effortlessly</p></li>
                            <li><p>Stay consistent with smart progress tracking</p></li>
                            <li><p>Achieve your goals faster with expert-backed routines</p></li>
                        </ul>
                        <h4 className='flex flex-col gap-2 text-center text-xl md:text-2xl'>
                            <span className='text-green-500'>Take the first step today!</span>
                            <span> Let us know about you and transform together</span>
                        </h4>
                        <button type='submit' className=' hidden lg:flex w-full justify-center '>
                            <motion.p variants={framer.buttonOnHover} whileHover="hover" className='w-fit border-1 rounded-xl border-green-500 p-4 shadow-lg shadow-green-500 cursor-pointer'>Get Started</motion.p>
                        </button>
                    </motion.div>
                    <ToastContainer />
                </form >
            </div>
        </motion.div >
    )
}

export default Setdata
