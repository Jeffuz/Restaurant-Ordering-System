import React from 'react'
import LpNavBar from '../components/landing-page/lpNavBar'
import { CgLastpass } from 'react-icons/cg'
import LpPopularItemCards from '../components/landing-page/lpPopularItemCards'

const Landing_page = () => {
    return (
        <>
            <div className='bg-light-secondary h-screen'>
                <LpNavBar />
            </div>
            <div className='bg-light-senary h-screen flex flex-col'>
                <LpPopularItemCards/>
            </div>
        </>
    )
}

export default Landing_page