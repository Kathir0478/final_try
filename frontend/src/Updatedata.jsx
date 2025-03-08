import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IoFitnessOutline } from "react-icons/io5";

const Updatedata = () => {
    const navigate = useNavigate()
    const base_api = "http://localhost:5000"
    const getapi = `${base_api}/api/getdata`
    const setapi = `${base_api}/api/setdata`
    const [userdata, setUserdata] = useState(null)
    const [moddata, setmoddata] = useState({ name: "", age: 0, height: 0, weight: 0, fitlevel: "", goal: "", frequency: 0, description: "" })
    const token = localStorage.getItem("token")

    async function fetchdata() {
        try {
            const user = await axios.get(getapi, {
                headers: { Authorization: token }
            })
            setUserdata(user.data)
            setmoddata(user.data)
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
    }, [])
    function validate() {
        if (Number(moddata.age) < 18 || Number(moddata.age) > 100) {
            alert("Enter valid age");
            return false;
        }
        if (Number(moddata.height) < 50 || Number(moddata.height) > 300) {
            alert("Enter valid height");
            return false;
        }
        if (Number(moddata.weight) < 20 || Number(moddata.weight) > 300) {
            alert("Enter valid weight");
            return false;
        }
        if (Number(moddata.frequency) < 1 || Number(moddata.frequency) > 7) {
            alert("Enter valid frequency");
            return false;
        }
        return true;
    }
    const handleChange = (event) => {
        setmoddata({ ...moddata, [event.target.name]: event.target.value })
    }
    const handleSubmit = async (event) => {
        event.preventDefault()
        if (validate()) {
            alert("Data updated succesfully")
            const user = await axios.post(setapi, moddata, {
                headers: { Authorization: token }
            })
            navigate('/')
        }
    }
    return (
        <div className='fixed top-0 left-0 w-screen h-screen flex flex-col bg-gray-950 text-white'>
            <div className='flex justify-between p-10'>
                <div className='flex gap-10 items-center'>
                    <IoFitnessOutline className='size-10 text-green-500' />
                    <h2>Home<span className='text-green-500'>Pulse</span></h2>
                </div>

                <button onClick={() => { navigate('/') }}><h4>Back to <span className='text-green-500'>Home</span></h4></button>
            </div>
            {userdata && (
                <form onSubmit={handleSubmit} className='flex items-center gap-5 px-40 '>
                    <div className='flex-1 border-green-500 border-1 rounded-lg p-10 bg-gray-600 shadow-lg shadow-green-500'>
                        <div className='flex flex-col gap-3'>
                            <div className='flex gap-5 items-center'>
                                <p className='w-56 italic'>Name </p>
                                <input type='text' placeholder={userdata.name} name='name' value={moddata.name} onChange={handleChange} className='border-1 rounded-lg border-green-500 p-2 pl-5 w-full  bg-gray-950' />
                            </div>
                            <div className='flex gap-5 items-center'>
                                <p className='w-56 italic'>Email </p>
                                <p className='border-1 rounded-lg border-green-500 p-2 pl-5 w-full opacity-50 cursor-not-allowed bg-gray-950'>{userdata.email}</p>
                            </div>
                            <div className='flex gap-5 items-center'>
                                <p className='w-56 italic'>Age </p>
                                <input type='number' placeholder={userdata.age} name='age' value={moddata.age} onChange={handleChange} className='bg-gray-950 border-1 rounded-lg border-green-500 p-2 pl-5  w-full appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none' />
                            </div>
                            <div className='flex gap-5 items-center'>
                                <p className='w-56 italic'>Height </p>
                                <input type='number' placeholder={userdata.height} name='height' value={moddata.height} onChange={handleChange} className='bg-gray-950 border-1 rounded-lg border-green-500 p-2 pl-5 w-full appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none' />
                            </div>
                            <div className='flex gap-5 items-center'>
                                <p className='w-56 italic'>weight </p>
                                <input type='number' placeholder={userdata.weight} name='weight' value={moddata.weight} onChange={handleChange} className='bg-gray-950 border-1 rounded-lg border-green-500 p-2 pl-5 w-full appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none' />
                            </div>
                            <div className='flex gap-5 items-center'>
                                <p className='w-56 italic'>Fitness Level </p>
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
                                <p className='w-56 italic'>Goal </p>
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
                                <p className='w-56 italic'>Frequency </p>
                                <input type='number' placeholder={moddata.frequency} name='frequency' value={moddata.frequency} onChange={handleChange} className='bg-gray-950 border-1 rounded-lg border-green-500 p-2 w-full pl-5 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none' />
                            </div>
                            <div className='flex gap-5 items-center'>
                                <p className='w-56 italic'>Description </p>
                                <textarea className='bg-gray-950 border-1 rounded-lg border-green-500 p-2 w-full pl-5 ' name='description' value={moddata.description} onChange={handleChange} />
                            </div>
                        </div>
                        <div className='flex gap-20 p-10 w-full justify-evenly'>
                            <button type='submit' className='rounded-xl p-4 bg-green-500'><h4>Update</h4></button>
                            <button onClick={() => { navigate("/workoutplan") }} className='rounded-xl p-4 bg-green-500'><h4>Start Workout</h4></button>
                        </div>
                    </div>
                    <div className='flex-1 flex flex-col p-10 gap-10'>
                        <h2 className='flex flex-col'><span className='text-green-500'>Update Your Details & </span><span>Keep Your Fitness Plan on Track!</span> </h2>
                        <p>
                            Your fitness journey evolves, and so should your workout plan! Keep your goals aligned with your progress by updating your details. By refreshing your information, you’ll ensure that your fitness plan stays accurate and effective.
                        </p>
                        <ul className='flex flex-col gap-3 indent-20'>
                            <li><p>Get workouts that match your current fitness level</p></li>
                            <li><p>Adjust your plan based on your progress & new goals</p></li>
                            <li><p>Stay on track with personalized recommendations</p></li>
                        </ul>
                        <h4>
                            <span className='text-green-500'>Take control of your fitness journey! </span> Update your details now to continue getting the best results.
                        </h4>
                    </div>
                </form>
            )
            }
        </div >
    )
}

export default Updatedata
