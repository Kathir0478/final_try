import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { IoFitnessOutline } from "react-icons/io5";
import { demo } from './assets/demo'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastOpt } from "./assets/ToastOpt"

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
        <div className='bg-gray-950 w-screen h-screen text-white flex flex-col'>
            <div className='w-full h-20 bg-gray-950 flex justify-between px-10 py-15'>
                <div className='flex gap-10 items-center'>
                    <IoFitnessOutline className='size-10 text-green-500' />
                    <h2>Home<span className='text-green-500'>Pulse</span></h2>
                </div>
                <button onClick={() => { navigate('/') }} className='flex items-center cursor-pointer'><h4>Back to <span className='text-green-500'>Home</span></h4></button>
            </div>

            {plan.length !== 0 ?
                (<div className='flex flex-col w-full h-full justify-center items-center'>
                    <div className='flex flex-col items-center justify-center py-10 lg:p-20 w-3/4 lg:w-1/2 h-auto border-1 border-green-500 rounded-3xl bg-gray-600 shadow-lg shadow-green-500'>
                        {plan.map((value, index) => (
                            <div key={index}>
                                {count === index && (
                                    <div className='w-full flex flex-col gap-5 items-center p-6'>
                                        <h2 className='text-center text-green-500'>{value.exercise}</h2>
                                        <h4 className='text-center italic p-5'>{value.guide}</h4>
                                        <h4>Repeat this for <span className='text-green-500'>{value.time}</span> times</h4>
                                        <div className='p-10 flex w-full justify-evenly'>
                                            <button className='bg-red-500 p-3 rounded-xl w-40 cursor-pointer' onClick={() => { handlePrev(value.reward) }}><p>Previous</p></button>
                                            <button className='bg-green-500 p-3 rounded-xl w-40 cursor-pointer' onClick={() => { handleNext(value.reward) }}><p>Next</p></button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                        {(count === -1) && (
                            <div className='flex flex-col gap-20 items-center'>
                                <h2>Lets get <span className='text-green-500'>Started!!!</span></h2>
                                <p className='text-center italic'>Whether you're here for strength, endurance, or just to feel good, your journey starts NOW. Get up, get moving, and let’s make every workout count!</p>
                                <button className='bg-green-500 p-3 rounded-xl w-30 cursor-pointer' onClick={() => { setCount(0) }}><p>Start</p></button>
                            </div>
                        )}
                        {count === plan.length && (
                            <div className='flex flex-col gap-10 items-center p-10'>
                                <h2>Have You <span className='text-green-500'>Completed?</span></h2>
                                <h4 className='italic text-center flex flex-col'>
                                    <span>Great job! Keep pushing, keep growing, and remember-</span>
                                    <span>every rep counts</span>
                                </h4>
                                <div className='flex gap-14'>
                                    <button className='bg-red-500 p-3 rounded-xl w-30 cursor-pointer' onClick={() => { setCount(0) }}><p>No</p></button>
                                    <button className='bg-green-500 p-3 rounded-xl w-30 cursor-pointer' onClick={() => { update({ count: 1, reward: 50 }) }}><p>Yes</p></button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>) :
                (navigate("/workoutplan"))
            }
            <ToastContainer />
        </div >
    )
}

export default Startworkout
