import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, signUpWithGoogle, writeUserData } from "../firebase";

const Signup = ({ isOpen, onClose, signupSuccess, setSignupSuccess }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isRestaurantOwner, setIsRestaurantOwner] = useState(false); // New state for the checkbox

    useEffect(() => {
        if (signupSuccess) {
            onClose();
        }
    }, [signupSuccess, onClose]);

    if (!isOpen) return null;

    const handleSignUpWithGoogle = async () => {
        await signUpWithGoogle(isRestaurantOwner);
        setSignupSuccess(true);
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const result = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            writeUserData(
                auth.currentUser.uid,
                name,
                name,
                isRestaurantOwner ? auth.currentUser.uid : 0,
                email,
                ""
            );
            setSignupSuccess(true);
        } catch (error) {
            if (error.code === "auth/email-already-in-use") {
                alert("Email is already in use. Please choose another email.");
                // Handle the case where the email is already in use (display an error message, etc.)
            } else {
                console.error("Signup error:", error.message);
            }
        }

        // Reset the form after submission
        setName("");
        setEmail("");
        setPassword("");
        setIsRestaurantOwner(false);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-20">
            <div className="bg-white w-[75%] h-[75%] p-3 rounded-[25px] shadow-lg flex flex-col">
                <button className="flex justify-end p-5 fixed">
                    <AiOutlineClose onClick={onClose} size={20} />
                </button>
                <div className="flex flex-col items-center justify-center h-screen">
                    <div className="p-8 w-96 bg-light-tertiary rounded-lg shadow-md">
                        <div className="text-3xl font-bold mb-4">Sign Up</div>
                        <form className="space-y-4" onSubmit={handleSignup}>
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-light-primary"
                                >
                                    Name
                                </label>
                                <input
                                    id="name"
                                    onChange={(e) => setName(e.target.value)}
                                    type="text"
                                    value={name}
                                    className="mt-1 block w-full rounded-md shadow-sm"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-light-primary"
                                >
                                    Email Address
                                </label>
                                <input
                                    id="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    type="email"
                                    value={email}
                                    className="mt-1 block w-full rounded-md shadow-sm"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block text-light-primary"
                                >
                                    Password
                                </label>
                                <input
                                    id="password"
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    type="password"
                                    value={password}
                                    className="mt-1 block w-full rounded-md shadow-sm"
                                    required
                                />
                            </div>

                            <div className="flex items-center">
                                <input
                                    id="isRestaurantOwner"
                                    type="checkbox"
                                    onChange={() =>
                                        setIsRestaurantOwner(!isRestaurantOwner)
                                    }
                                    checked={isRestaurantOwner}
                                    className="mr-2"
                                />
                                <label
                                    htmlFor="isRestaurantOwner"
                                    className="text-light-primary"
                                >
                                    I am a restaurant owner
                                </label>
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
                        onClick={handleSignUpWithGoogle}
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
