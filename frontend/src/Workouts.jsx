import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IoFitnessOutline } from "react-icons/io5";


const Card = ({ day, plan, index, selected, setSelected }) => {
    const navigate = useNavigate()
    return (
        <div className='flex flex-col gap-5 p-10 bg-gray-600 rounded-3xl'>
            <div className='flex justify-between w-full'>
                <h2 className='text-green-500'>{day}</h2>
                <button onClick={() => setSelected(index)} className='bg-green-500 rounded-lg w-30'>
                    {selected === index ? <span onClick={() => { navigate('/session', { state: plan }) }}>Select</span> : "View"}
                </button>
            </div>
            <div className={`flex flex-col gap-5 `}>
                {selected === index && plan.map((value, idx) => (
                    <div key={idx} className='flex flex-col gap-2 px-10 w-full'>
                        <div className='flex justify-between text-green-500'>
                            <h2>{value.exercise}</h2>
                            <h2>{value.time}</h2>
                        </div>
                        <p>{value.guide}</p>
                    </div>
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
    const base_api = "http://localhost:5000"
    const api = `${base_api}/api/getdata`
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
                console.error("Error fetching data:", error);
            }
        }
    }
    useEffect(() => {
        if (!token) {
            navigate("/error")
        }
        fetchdata()
    }, [])
    const handleSelect = (index) => {
        setSelected(prev => prev === index ? -1 : index)
    }
    return (
        <div className='bg-gray-950 h-full min-h-screen text-white relative bg-fixed flex flex-col'>
            <div className='fixed w-full h-20 bg-gray-950 flex justify-between px-10 py-15'>
                <div className='flex gap-10 items-center'>
                    <IoFitnessOutline className='size-10 text-green-500' />
                    <h2>Home<span className='text-green-500'>Pulse</span></h2>
                </div>
                <div className='flex items-center'>
                    <button onClick={() => { navigate('/') }}><h4>Back to <span className='text-green-500'>Home</span></h4></button>
                </div>
            </div>
            {workouts && <div className='flex my-25'>
                <div className='flex flex-col p-20 flex-1 gap-10' >
                    <h2><span className='text-green-500'>Your</span> Workout Plan</h2>
                    <div className='flex flex-col gap-5'>
                        {Object.entries(workouts).map(([day, exercises], index) => (
                            <Card key={index} day={day} plan={exercises} index={index} selected={selected} setSelected={handleSelect} />
                        ))}
                    </div>
                </div>
                <div className='flex-1 flex flex-col p-20 w-full h-screen justify-center items-center'>
                    <div className='flex flex-col leading-relaxed fixed w-2/5'>
                        <div className='flex flex-col gap-1 p-5'>
                            <h2 className='text-green-500'>Unlock Your Best Self</h2>
                            <h2>One Workout at a Time!</h2>
                        </div>
                        <p className='p-5'>Every journey begins with a decision—to show up, to put in the effort, and to become better than yesterday. This workout plan is not just a routine; it's a step toward a stronger, healthier, and more confident YOU. </p>
                        <h2 className='italic text-green-500 p-5 py-20 text-center'>Let’s get started!</h2>
                    </div>
                </div>
            </div>}
            {(!workouts || Object.keys(workouts).length === 0) && (
                <div className='flex flex-col items-center gap-10 justify-center h-screen text-white'>
                    <h2 className='text-green-500 '>No Workout Plan Found</h2>
                    <p className='text-white text-center flex flex-col gap-2 leading-relaxed '>
                        <p>It looks like you haven't set up your workout plan yet.</p>
                        <p>Start your fitness journey by filling in your details now!</p>
                    </p>
                    <button className='px-10 py-4 m-10 bg-green-500 text-white rounded-lg ' onClick={() => navigate('/setdata')}>
                        <p>Fill Your Workout Plan</p>
                    </button>
                </div>
            )}

        </div>
    )
}

export default Workouts

