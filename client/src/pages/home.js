import React from 'react'
import { Link } from 'react-router-dom'


const Home = () => {
    // BUG: If you route to another page and come back to home page, another websocket connection comes live
    function initialize(hostname, port){
        var socket = new WebSocket(`ws://${hostname}:${port}`);
        socket.addEventListener('open', () => {
            console.log("Connected to server");
        });
    }

    initialize('127.0.0.1', '8080');

    return (
        <div className='flex h-screen justify-center items-center flex-col gap-2'>
            <div className='text-2xl'>Temporarily Here...</div>
            <div className='flex gap-5'>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/login">Login</Link>
                <Link to="/menu">Menu</Link>
                <Link to="/table">Table</Link>
            </div>
        </div>
    )
}

export default Home