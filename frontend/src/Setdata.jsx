import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Setdata = () => {
    const navigate = useNavigate()
    const base_api="https://final-try-backend.onrender.com"
    const api = `${base_api}/api/setdata`
    const [moddata, setmoddata] = useState({ age: "", gender: '', height: "", weight: "", fitlevel: "", goal: "", frequency: "", description: "" })
    const token = localStorage.getItem("token")
    useEffect(() => {
        if (!token) {
            navigate("/error")
        }
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
        event.preventDefault();
        if (validate()) {
            try {
                const response = await axios.post(api, moddata, {
                    headers: { Authorization: token }
                });
                alert("Data submitted successfully!");
                navigate("/");
            } catch (error) {
                alert("Error submitting data: " + error.response?.data?.message || error.message);
            }
        }
    };
    return (
        <div>
            <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center h-screen w-screen gap-10'>
                <div className='flex flex-col gap-4 p-10 '>
                    <div className='flex items-center border-sky-400 border-2 rounded-lg p-2'>
                        <p className='w-42 p-2'>Age </p>
                        <input type='number' placeholder="Enter age between 18-100" name='age' value={moddata.age} onChange={handleChange} className='p-2 outline-none w-full' required />
                    </div>
                    <div className="flex items-center border-sky-400 border-2 rounded-lg p-2" >
                        <p className="w-42 p-2">Gender</p>
                        <div className="flex gap-4 flex-1" required>
                            <label className="flex items-center gap-2">
                                <input type="radio" name="gender" value="Male" checked={moddata.gender === "Male"} onChange={handleChange} required />
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
                        <input type='number' placeholder="Enter valid height in cm" name='height' value={moddata.height} onChange={handleChange} className='w-full p-2 outline-none' required />
                    </div>
                    <div className='flex items-center border-sky-400 border-2 rounded-lg p-2'>
                        <p className='w-42 p-2'>weight </p>
                        <input type='number' placeholder="Enter valid weight in kg" name='weight' value={moddata.weight} onChange={handleChange} className='w-full p-2 outline-none' required />
                    </div>
                    <div className='flex items-center border-sky-400 border-2 rounded-lg p-2'>
                        <p className='w-42 p-2'>Fitness Level </p>
                        <label className='flex-1'>
                            <select name='fitlevel' value={moddata.fitlevel} onChange={handleChange} className='w-full p-2 rounded-lg outline-none ' required>
                                <option value="">Select your current fitness level</option>
                                <option value="Beginner">Beginner</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Advanced">Advanced</option>
                            </select>
                        </label>
                    </div>
                    <div className='flex items-center border-sky-400 border-2 rounded-lg p-2'>
                        <p className='w-42 p-2'>Goal </p>
                        <label className='flex-1'>
                            <select name='goal' value={moddata.goal} onChange={handleChange} className='w-full p-2 rounded-lg outline-none' required>
                                <option value="">What is your goal</option>
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
                        <p className='w-42 p-2'>Frequency </p>
                        <input type='number' placeholder="Days to spend in week" name='frequency' value={moddata.frequency} onChange={handleChange} className='p-2 outline-none w-full' required />
                    </div>
                    <div className='flex items-center border-sky-400 border-2 rounded-lg p-2'>
                        <p className='w-42 p-2'>Description </p>
                        <textarea className='outline-none w-full' placeholder="Any medical conditions" name='description' value={moddata.description} onChange={handleChange} />
                    </div>
                </div>
                <button type='submit' className='border-2 p-2 rounded-lg border-sky-400'>Proceed</button>
            </form>
        </div>
    )
}

export default Setdata
