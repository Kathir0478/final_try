import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IoFitnessOutline } from "react-icons/io5";

const Setdata = () => {
    const navigate = useNavigate()
    const base_api = "http://localhost:5000"
    const api = `${base_api}/api/setdata`
    const [moddata, setmoddata] = useState({ age: "", gender: "", height: "", weight: "", fitlevel: "", goal: "", frequency: "", description: "" })
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
        <div className='fixed top-0 left-0 w-screen h-screen flex flex-col bg-gray-950 text-white'>
            <div className='flex justify-between p-10'>
                <div className='flex gap-10 items-center'>
                    <IoFitnessOutline className='size-10 text-green-500' />
                    <h2>Home<span className='text-green-500'>Pulse</span></h2>
                </div>
            </div>
            <form onSubmit={handleSubmit} className='flex items-center gap-5 px-40'>
                <div className='flex-1 border-green-500 border-1 rounded-lg p-20 bg-gray-600 shadow-lg shadow-green-500'>
                    <div className='flex flex-col gap-5 '>
                        <div className='flex gap-5 items-center'>
                            <p className='w-56 italic'>Age </p>
                            <input type='number' placeholder="Enter age between 18-100" name='age' value={moddata.age} onChange={handleChange} className='bg-gray-950 border-1 rounded-lg border-green-500 p-2 pl-5  w-full appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none' required />
                        </div>
                        <div className='flex gap-5 items-center'>
                            <p className='w-56 italic'>Height </p>
                            <input type='number' placeholder="Enter valid height in cm" name='height' value={moddata.height} onChange={handleChange} className='bg-gray-950 border-1 rounded-lg border-green-500 p-2 pl-5 w-full appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none' required />
                        </div>
                        <div className='flex gap-5 items-center'>
                            <p className='w-56 italic'>weight </p>
                            <input type='number' placeholder="Enter valid weight in kg" name='weight' value={moddata.weight} onChange={handleChange} className='bg-gray-950 border-1 rounded-lg border-green-500 p-2 pl-5 w-full appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none' required />
                        </div>
                        <div className="flex gap-5 items-center">
                            <p className="w-56 italic">Gender</p>
                            <div className="border-1 rounded-lg border-green-500 p-2 w-full flex justify-evenly bg-gray-950">
                                <label className="flex gap-2">
                                    <input type="radio" name="gender" value="Male" checked={moddata.gender === "Male"} onChange={handleChange} />
                                    Male
                                </label>
                                <label className="flex gap-2">
                                    <input type="radio" name="gender" value="Female" checked={moddata.gender === "Female"} onChange={handleChange} />
                                    Female
                                </label>
                            </div>
                        </div>
                        <div className='flex items-center gap-5'>
                            <p className='w-56 italic'>Fitness Level </p>
                            <label className='bg-gray-950 border-1 rounded-lg border-green-500 p-2 pl-5  w-full'>
                                <select name='fitlevel' value={moddata.fitlevel} onChange={handleChange} className='w-full outline-none bg-gray-950' required>
                                    <option value="">Select your current fitness level</option>
                                    <option value="Beginner">Beginner</option>
                                    <option value="Intermediate">Intermediate</option>
                                    <option value="Advanced">Advanced</option>
                                </select>
                            </label>
                        </div>
                        <div className='flex items-center gap-5'>
                            <p className='w-56 italic'>Goal </p>
                            <label className='border-1 rounded-lg border-green-500 p-2 pl-5 w-full bg-gray-950'>
                                <select name='goal' value={moddata.goal} onChange={handleChange} className='w-full bg-gray-950 outline-none' required>
                                    <option value="">What is your goal</option>
                                    <option value="General Fitness">General Fitness</option>
                                    <option value="Muscle Building">Muscle Building</option>
                                    <option value="Weight Loss">Weight Loss</option>
                                    <option value="Flexibility Mobility">Flexibility & Mobility</option>
                                    <option value="Cardio Endurance">Cardiovascular Endurance</option>
                                    <option value="Mental Wellbeing">Mental Well-being</option>
                                </select>
                            </label>
                        </div>
                        <div className='flex items-center gap-5'>
                            <p className='w-56 italic'>Frequency </p>
                            <input type='number' placeholder="Days to spend in week" name='frequency' value={moddata.frequency} onChange={handleChange} className='bg-gray-950 border-1 rounded-lg border-green-500 p-2 w-full pl-5 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none' required />
                        </div>
                        <div className='flex items-center gap-5'>
                            <p className='w-56 italic'>Description </p>
                            <textarea className='bg-gray-950 border-1 rounded-lg border-green-500 p-2 w-full pl-5 ' placeholder="Any medical conditions" name='description' value={moddata.description} onChange={handleChange} />
                        </div>
                    </div>
                </div>
                <div className='flex-1 flex flex-col p-10 gap-10'>
                    <h2 className='flex flex-col'><span className='text-green-500'>Enter Your Details & </span><span>Get Your Perfect Workout Plan!</span> </h2>
                    <p>
                        Unlock a personalized fitness plan tailored to your goals, lifestyle, and fitness level. By entering your details, you’ll get an accurate workout plan that helps you:
                    </p>
                    <ul className='flex flex-col gap-3 indent-20'>
                        <li><p>Build strength & endurance effortlessly</p></li>
                        <li><p>Stay consistent with smart progress tracking</p></li>
                        <li><p>Achieve your goals faster with expert-backed routines</p></li>
                    </ul>
                    <h4>
                        <span className='text-green-500'>Take the first step today!</span> Enter your details now and transform your fitness journey.
                    </h4>
                    <button type='submit' className='flex w-full justify-center '>
                        <p className='w-fit border-1 rounded-xl border-green-500 p-4 shadow-lg shadow-green-500'>Get Started</p>
                    </button>
                </div>

            </form >
        </div >
    )
}

export default Setdata
