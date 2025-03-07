import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IoFitnessOutline } from "react-icons/io5"

const Profile = () => {
    const navigate = useNavigate()
    const [userData, setUserData] = useState({})
    const [proglevel, setProglevel] = useState({ level: 0, extra: 0, levelup: 0 })
    const token = localStorage.getItem('token')
    const base_api = "http://localhost:5000"
    const getapi = `${base_api}/api/getdata`
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
                console.error("Error fetching data:", error);
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
        <div className='fixed top=0 left-0 w-screen h-screen bg-gray-950 text-white flex flex-col'>
            <div className='flex justify-between items-center p-10'>
                <h1 className='flex items-center'>Home<span className='flex items-center gap-5 text-green-500'>Pulse<IoFitnessOutline /></span></h1>
                <button onClick={() => { navigate("/") }} className='cursor-pointer'><h4>Back to <span className='text-green-500'>Home</span></h4></button>
            </div>
            <div className='flex flex-col items-center justify-center flex-1'>
                <div className='flex flex-col gap-4 border-4 border-green-400 p-20 w-full max-w-3xl rounded-lg shadow-lg shadow-green-500 leading-relaxed'>
                    <h2 className='text-green-500 pb-10 text-center'>Your Progress Here</h2>
                    <div>
                        <h2 className='flex gap-4'><span className='text-green-500'>{userData.name + " "}</span>{userData.email}</h2>
                    </div>
                    <h4>Total Streak : <span className='text-green-500'>{userData.visits}</span></h4>
                    <h4>Your current level : <span className='text-green-500'>{proglevel.level}</span></h4>
                    <div className='w-full bg-gray-800 h-10 rounded-lg'>
                        <div className={`h-full bg-gradient-to-r from-green-100 to-green-500 rounded-lg`} style={{ width: `${proglevel.extra / 100}%` }}></div>
                    </div>
                    <h4>Points to reach next level : <span className='text-green-500'>{proglevel.levelup}</span></h4>
                    <h2 className='w-full text-center p-10 italic text-green-500'>Your progress matters</h2>
                </div>
            </div>
        </div>
    )
}

export default Profile
