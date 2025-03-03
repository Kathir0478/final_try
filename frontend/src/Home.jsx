import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const [user, setUser] = useState("")
    const navigate = useNavigate()
    const [options, showOptions] = useState(false)
    const api = "http://localhost:5000/api/getdata"
    const token = localStorage.getItem("token")
    async function fetchData() {
        const result = await axios.get(api, {
            headers: { Authorization: token }
        })
        setUser(result.data.email)
    }
    useEffect(() => {
        fetchData()
    }, [])
    const logout = () => {
        localStorage.removeItem('token')
        setUser(null)
        navigate('/')
    }
    console.log(user)
    return (
        <div className='flex gap-10 justify-end p-10 relative'>

            {user ? <button onClick={() => { navigate('/updatedata') }}><p>Update details</p></button> : <p></p>}
            {user ? <button onClick={() => { navigate('/workoutplan') }}><p>Get workout plan</p></button> : <p></p>}
            {user ?
                (<div className='relative'>
                    <button onClick={() => { showOptions(!options) }}>
                        <p>{user}</p>
                    </button>
                    {options &&
                        <div className='py-5 absolute'>
                            <button onClick={logout}><p>Logout</p></button>
                        </div>
                    }
                </div>
                )
                :
                (<button onClick={() => { navigate("/login") }}><p>Login/Signup</p></button>)
            }
        </div>
    )
}

export default Home