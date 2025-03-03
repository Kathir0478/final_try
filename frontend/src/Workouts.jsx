import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Card = ({ day, plan }) => {
    return (
        <div>
            <p>{day}</p>
            {plan.map((value, index) => (
                <div>
                    <h1>{value.exercise}</h1>
                    <p>-{value.guide}-{value.time}</p>
                </div>
            ))}
        </div >
    )
}

const Workouts = () => {
    const navigate = useNavigate()
    const [workouts, setWorkouts] = useState({})
    const token = localStorage.getItem("token")
    const api = "http://localhost:5000/api/getdata"
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
        fetchdata()
    }, [])
    return (
        <div>
            {Object.keys(workouts).length > 0 ? (
                Object.entries(workouts).map(([day, exercises]) => (
                    <div key={day}>
                        <Card day={day} plan={exercises} />
                    </div>
                ))
            ) : (
                <p>Loading workouts...</p>
            )}
        </div>
    )
}

export default Workouts