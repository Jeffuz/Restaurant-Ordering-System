import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

const Signup = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-20">
      <div className="bg-white w-[75%] h-[75%] p-3 rounded-[25px] shadow-lg flex flex-col">
        <button className="flex justify-end p-5 fixed">
          <AiOutlineClose onClick={onClose} size={20} />
        </button>
        <div className="flex flex-col items-center justify-center h-screen">
          <div className="p-8 w-96 bg-light-tertiary rounded-lg shadow-md">
            <div className="text-3xl font-bold mb-4">Sign Up</div>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-light-primary">
                  Name
                </label>
                <input
                  id="name"
                  // onChange={}
                  type="text"
                  className="mt-1 block w-full rounded-md shadow-sm"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-light-primary">
                  Email Address
                </label>
                <input
                  id="email"
                  // onChange={}
                  type="email"
                  className="mt-1 block w-full rounded-md shadow-sm"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-light-primary">
                  Password
                </label>
                <input
                  id="password"
                  // onChange={}
                  type="password"
                  className="mt-1 block w-full rounded-md shadow-sm"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-light-secondary text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-200"
              >
                Sign Up
              </button>
            </form>
          </div>
          <button
            //onClick={} google sign in
            className="mt-4 flex items-center justify-center bg-light-tertiary text-light-primary py-2 px-4 rounded-md w-96"
          >
            <FcGoogle className="mr-2" /> Sign Up with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
