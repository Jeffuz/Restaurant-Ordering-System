import React from 'react'
import { FaFacebook, FaInstagram, FaTwitterSquare } from 'react-icons/fa';

const LpFooter = (restaurantInfo) => {
    return (
        <footer className="bg-light-tertiary py-8 ">
            <div className="flex flex-col items-center">
                <div className="text-4xl font-bold text-light-secondary mb-4">{restaurantInfo.name}</div>
                <div className="flex justify-center space-x-4 text-light-primary">
                    <a href={restaurantInfo.facebookLink}><FaFacebook className="text-xl" size={30}/></a>
                    <a href={restaurantInfo.instagramLink}><FaInstagram className="text-xl " size={30}/></a>
                    <a href={restaurantInfo.twitterLink}><FaTwitterSquare className="text-xl " size={30}/></a>
                </div>
            </div>
            <div className="mt-4 text-center ">
                © {new Date().getFullYear()} {restaurantInfo.name}. All rights reserved.
            </div>
        </footer>
    )
}

export default LpFooter