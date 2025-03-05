import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
    const navigate = useNavigate()
    const [userData, setUserData] = useState({})
    const token = localStorage.getItem('token')
    const base_api="https://final-try-backend.onrender.com"
    const getapi = `${base_api}/api/getdata`
    async function fetchdata() {
        try {
            const user = await axios.get(getapi, {
                headers: { Authorization: token }
            })
            setUserData(user.data)
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
    }, [token])
    return (
        <div className='flex flex-col p-10'>
            <div className='flex justify-end'>
                <button onClick={() => { navigate("/") }} className='p-10'><p>Back to home</p></button>
            </div>
            <div className='flex flex-col gap-10'>
                <div className='flex gap-10'>
                    <p>{userData.email}</p>
                    <p>{userData.name}</p>
                </div>
                <p>Your Progress in fitness: {userData.progress}</p>
                <p>Total number of days completed : {userData.visits}</p>
            </div>
            <div className='flex justify-end'>
                <button onClick={() => { navigate("/updatedata") }} className='p-10'><p>Update</p></button>
            </div>
        </div>
    )
}

export default Profile
