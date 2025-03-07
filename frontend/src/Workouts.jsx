import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Card = ({ day, plan, index, selected, setSelected }) => {
    const navigate = useNavigate()
    return (
        <div className='flex flex-col gap-5 p-10 items-start'>
            <div className='flex gap-5'>
                <h1>{day}</h1>
                <button onClick={() => setSelected(index)}>
                    {selected === index ? <span onClick={() => { navigate('/session', { state: plan }) }}>Select</span> : "View"}
                </button>
            </div>
            {selected === index && plan.map((value, idx) => (
                <div key={idx} className='flex flex-col gap-2 px-10 w-full'>
                    <div className='flex justify-between'>
                        <h2>{value.exercise}</h2>
                        <h2>{value.time}</h2>
                    </div>
                    <p>{value.guide}</p>
                </div>
            ))}

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
    console.log(selected)
    return (
        <div className='flex flex-col p-10'>
            <div className='flex justify-between'>
                <h1>Your workout plan</h1>
                <button onClick={() => { navigate('/') }}><p>Back to home</p></button>
            </div>
            {Object.entries(workouts).map(([day, exercises], index) => (
                <Card key={index} day={day} plan={exercises} index={index} selected={selected} setSelected={handleSelect} />
            ))}
        </div>
    )
}

export default Workouts
