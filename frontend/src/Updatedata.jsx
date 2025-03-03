import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Updatedata = () => {
    const navigate = useNavigate()
    const getapi = "http://localhost:5000/api/getdata"
    const setapi = "http://localhost:5000/api/setdata"
    const [userdata, setUserdata] = useState(null)
    const [moddata, setmoddata] = useState({ name: "", age: 0, gender: '', height: 0, weight: 0, fitlevel: "", goal: "", duration: 0, frequency: 0, description: "" })
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
        if (Number(moddata.duration) < 1 || Number(moddata.duration) > 24) {
            alert("Enter valid duration");
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
            const user = await axios.post(setapi, moddata, {
                headers: { Authorization: token }
            })
            navigate('/')
        }
    }
    return (
        <div>
            <div className='flex p-10 justify-end'>
                <button onClick={() => { navigate('/') }}><p>Back to Home</p></button>
            </div>
            {userdata && (
                <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center h-screen w-screen gap-10'>
                    <div className='flex flex-col gap-4 p-10 '>
                        <div className='flex items-center border-sky-400 border-2 rounded-lg p-2'>
                            <p className='w-42 p-2'>Name </p>
                            <input type='text' placeholder={userdata.name} name='name' value={moddata.name} onChange={handleChange} className='w-full p-2 outline-none' />
                        </div>
                        <div className='flex items-center border-sky-400 border-2 rounded-lg p-2'>
                            <p className='w-42 p-2'>Email </p>
                            <p className='w-full'>{userdata.email}</p>
                        </div>
                        <div className='flex items-center border-sky-400 border-2 rounded-lg p-2'>
                            <p className='w-42 p-2'>Age </p>
                            <input type='number' placeholder={userdata.age} name='age' value={moddata.age} onChange={handleChange} className='p-2 outline-none w-full' />
                        </div>
                        <div className="flex items-center border-sky-400 border-2 rounded-lg p-2">
                            <p className="w-42 p-2">Gender</p>
                            <div className="flex gap-4 flex-1">
                                <label className="flex items-center gap-2">
                                    <input type="radio" name="gender" value="Male" checked={moddata.gender === "Male"} onChange={handleChange} />
                                    Male
                                </label>
                                <label className="flex items-center gap-2">
                                    <input type="radio" name="gender" value="Female" checked={moddata.gender === "Female"} onChange={handleChange} />
                                    Female
                                </label>
                            </div>
                        </div>
                        <div className='flex items-center border-sky-400 border-2 rounded-lg p-2'>
                            <p className='w-42 p-2'>Height </p>
                            <input type='number' placeholder={userdata.height} name='height' value={moddata.height} onChange={handleChange} className='w-full p-2 outline-none' />
                        </div>
                        <div className='flex items-center border-sky-400 border-2 rounded-lg p-2'>
                            <p className='w-42 p-2'>weight </p>
                            <input type='number' placeholder={userdata.weight} name='weight' value={moddata.weight} onChange={handleChange} className='w-full p-2 outline-none' />
                        </div>
                        <div className='flex items-center border-sky-400 border-2 rounded-lg p-2'>
                            <p className='w-42 p-2'>Fitness Level </p>
                            <label className='flex-1'>
                                <select name='fitlevel' value={moddata.fitlevel} onChange={handleChange} className='w-full p-2 rounded-lg outline-none '>
                                    <option value="">{userdata.fitlevel}</option>
                                    <option value="Beginner">Beginner</option>
                                    <option value="Intermediate">Intermediate</option>
                                    <option value="Advanced">Advanced</option>
                                </select>
                            </label>
                        </div>
                        <div className='flex items-center border-sky-400 border-2 rounded-lg p-2'>
                            <p className='w-42 p-2'>Goal </p>
                            <label className='flex-1'>
                                <select name='goal' value={moddata.goal} onChange={handleChange} className='w-full p-2 rounded-lg outline-none'>
                                    <option value="">{userdata.goal}</option>
                                    <option value="General Fitness">General Fitness</option>
                                    <option value="Muscle Building">Muscle Building</option>
                                    <option value="Weight Loss">Weight Loss</option>
                                    <option value="Flexibility Mobility">Flexibility & Mobility</option>
                                    <option value="Cardio Endurance">Cardiovascular Endurance</option>
                                    <option value="Mental Wellbeing">Mental Well-being</option>
                                    <option value="Sport Training">Sport-Specific Training</option>
                                    <option value="Habit Consistency">Build Workout Habit</option>
                                </select>
                            </label>
                        </div>
                        <div className='flex items-center border-sky-400 border-2 rounded-lg p-2'>
                            <p className='w-42 p-2'>Duration </p>
                            <input type='number' placeholder={userdata.duration} name='duration' value={moddata.duration} onChange={handleChange} className='p-2 outline-none w-full' />
                        </div>
                        <div className='flex items-center border-sky-400 border-2 rounded-lg p-2'>
                            <p className='w-42 p-2'>Frequency </p>
                            <input type='number' placeholder={moddata.frequency} name='frequency' value={moddata.frequency} onChange={handleChange} className='p-2 outline-none w-full' />
                        </div>
                        <div className='flex items-center border-sky-400 border-2 rounded-lg p-2'>
                            <p className='w-42 p-2'>Description </p>
                            <textarea className='outline-none w-full' name='description' value={moddata.description} onChange={handleChange} />
                        </div>
                    </div>
                    <button type='submit' className='border-2 p-2 rounded-lg border-sky-400'>Update</button>
                </form>
            )}
        </div>
    )
}

export default Updatedata