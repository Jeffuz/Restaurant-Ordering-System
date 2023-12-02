import React from 'react'
import { Link } from 'react-router-dom'


const Home = () => {
    return (
        <div className='flex h-screen justify-center items-center flex-col gap-2'>
            <div className='text-2xl'>Temporarily Here...</div>
            <div className='flex gap-5'>
                <Link to="/login">Login</Link>
                <Link to="/menu">Menu</Link>
                <Link to="/table">Table</Link>
                <Link to="/landing-page">Home</Link>
                <Link to="/admin-dashboard">Admin dashboard</Link>
            </div>
        </div>
    )
}

export default Home