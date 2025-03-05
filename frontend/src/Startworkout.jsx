import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const Startworkout = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [userData, setUserdata] = useState({})
    const plan = location.state || []
    const [count, setCount] = useState(-1)
    const token = localStorage.getItem("token")
    const base_api="https://final-try-backend.onrender.com"
    const getapi = `${base_api}/api/getdata`
    const updateapi = `${base_api}/api/update`
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
                console.error("Error fetching data:", error);
            }
        }
    }
    const handleNext = (given) => {
        setCount(count + 1)
        update({ reward: given })
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
                console.error("Error fetching data:", error);
            }
        }
        console.log(count)
        console.log(reward)
    }
    useEffect(() => {
        fetchdata()
        update({ reward: 100 })
    }, [])
    return (
        <div className='flex flex-col w-full h-full items-center justify-center p-20'>
            <button className='flex justify-end w-full' onClick={() => { navigate("/") }}><p>Back to home</p></button>
            {plan.map((value, index) => (
                <div key={index}>
                    {count === index && (
                        <div className='flex flex-col gap-5'>
                            <h2>{value.exercise}</h2>
                            <p>{value.guide}</p>
                            <p>Repeat this for {value.time} times</p>
                            <div className='flex gap-10'>
                                <button onClick={() => { setCount(count - 1) }}>Previous</button>
                                <button onClick={() => { handleNext(value.reward) }}>Next</button>
                            </div>
                        </div>
                    )}
                </div>
            ))}
            {(count === plan.length || count === -1) && (
                <div className='flex gap-10'>
                    <button onClick={() => { setCount(0) }}><p>Start</p></button>
                    <button onClick={() => { navigate("/") }}><p>Completed</p></button>
                </div>
            )}
            {count === plan.length && (
                <div>
                    <h1>Have You completed</h1>
                    <button onClick={() => { update({ count: 1, reward: 100 }) }}><p>Yes</p></button>
                </div>
            )}
        </div >
    )
}

export default Startworkout
