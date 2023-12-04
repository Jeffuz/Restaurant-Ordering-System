import React from 'react'
import { useParams } from 'react-router-dom';
import LpNavBar from '../components/landing-page/lpNavBar';

const Profile = () => {
    const { username } = useParams();
    return (
        <div>
            <LpNavBar/>
            <div className='flex flex-col justify-center items-center h-screen'>
                {username}'s Profile
            </div>
        </div>
    )
}

export default Profile