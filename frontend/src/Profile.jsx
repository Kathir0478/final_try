import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IoFitnessOutline } from "react-icons/io5"
import { demo } from './assets/demo'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastOpt } from "./assets/ToastOpt"

const Profile = () => {
    const navigate = useNavigate()
    const [userData, setUserData] = useState({})
    const [proglevel, setProglevel] = useState({ level: 0, extra: 0, levelup: 0 })
    const token = localStorage.getItem('token')
    const getapi = demo.getdata
    async function fetchdata() {
        try {
            const user = await axios.get(getapi, {
                headers: { Authorization: token }
            })
            setUserData(user.data)
            const level = Math.floor(user.data.progress / 1000)
            const nextlevel = user.data.progress % 1000
            setProglevel({ level: level, extra: nextlevel, levelup: 1000 - nextlevel })
        } catch (error) {
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
            navigate("/error")
        }
        fetchdata()
    }, [token])
    return (
        <div className='w-full min-h-screen h-full bg-gray-950 text-white flex flex-col'>
            <div className='fixed w-full h-20 flex justify-between items-center p-20 z-10'>
                <h1 className='flex items-center'>
                    Home<span className='text-green-500 flex items-center gap-4'>Pulse<IoFitnessOutline className='size-10' /></span>
                </h1>
                <button onClick={() => navigate("/")} className='cursor-pointer '>
                    <h4>Back to <span className='text-green-500'>Home</span></h4>
                </button>
            </div>

            <div className='flex flex-col items-center justify-center flex-1'>
                <div className='flex flex-col gap-6 border border-green-500 bg-gray-900 p-10 w-full lg:p-20 max-w-3xl rounded-3xl shadow-lg shadow-green-500 leading-relaxed'>
                    <h2 className='text-green-500 text-center '>Your Fitness Journey Unfolds</h2>

                    <div className='flex flex-col items-center gap-1'>
                        <h4><span className='text-green-500'>{userData.name}</span></h4>
                        <p className='opacity-50'>{userData.email}</p>
                    </div>

                    <div className='flex flex-col gap-4'>
                        <h4>Total Streak: <span className='text-green-500'>{userData.visits}</span> days</h4>
                        <h4>Current Level: <span className='text-green-500'>{proglevel.level}</span></h4>

                        <div className='relative w-full bg-gray-800 h-8 rounded-full overflow-hidden'>
                            <div
                                className='h-full bg-gradient-to-r from-green-200 to-green-600 rounded-full transition-all duration-700 ease-in-out'
                                style={{ width: `${(proglevel.extra / 1000) * 100}%` }}
                            />
                        </div>
                        <h4 className='text-center'>Points to next level: <span className='text-green-500'>{proglevel.levelup}</span></h4>
                    </div>

                    <h4 className='w-full text-center p-5 italic text-green-500'>Your progress matters – Keep pushing forward!</h4>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Profile
