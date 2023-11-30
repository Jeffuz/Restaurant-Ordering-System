import React from 'react'
import { FaFacebook, FaInstagram, FaTwitterSquare } from 'react-icons/fa';

const LpFooter = () => {
    return (
        <footer className="bg-light-secondary py-8">
            <div className="flex flex-col items-center">
                <h2 className="text-4xl font-bold text-white mb-4">115A's Diner</h2>
                <div className="flex justify-center space-x-4">
                    <a href=''><FaFacebook className="text-xl text-white" size={30}/></a>
                    <a href=''><FaInstagram className="text-xl text-white" size={30}/></a>
                    <a href=''><FaTwitterSquare className="text-xl text-white" size={30}/></a>
                </div>
            </div>
            <div className="mt-4 text-center text-white">
                © {new Date().getFullYear()} 115A's Diner. All rights reserved.
            </div>
        </footer>
    )
}

export default LpFooter