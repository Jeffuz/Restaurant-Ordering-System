import React, { useState, useEffect } from "react";
import Login from "../login";
import Signup from "../signup";
import { IoCartOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { MdOutlineDashboard } from "react-icons/md";
import LpShoppingCart from "./lpShoppingCart";
import { auth, readUserData } from "../../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

const LpNavBar = () => {
    /* Testing */
    // let email = true;
    // let email = false;
    // let admin = true;
    // let admin = false;

    const [email, setEmail] = useState(false);
    const [admin, setAdmin] = useState(false);
    const [signupSuccess, setSignupSuccess] = useState(false);
    const [signinSuccess, setSigninSuccess] = useState(false);

    useEffect(() => {
        // Define an async function to handle user authentication
        const handleAuthChange = async (user) => {
            if (user) {
                setEmail(user.email);

                try {
                    const userData = await readUserData(user.uid);
                    setAdmin(userData.restaurantId !== 0);
                } catch (error) {
                    console.error(error);
                }
            } else {
                setEmail(null);
                setAdmin(false);
            }
        };

        const unsubscribe = onAuthStateChanged(auth, handleAuthChange);

        return () => unsubscribe();
    }, [auth]);

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                setEmail(false);
                setAdmin(false);
                setSigninSuccess(false);
                setSignupSuccess(false);
            })
            .catch((error) => {
                console.error("Logout error:", error);
            });
    };

    const cartItems = [
        {
            itemImage: "test/nacho-chips.png",
            itemName: "Nacho chips",
            itemPrice: 9.99,
            itemCount: 1,
        },
        {
            itemImage: "test/nacho-chips.png",
            itemName: "Nacho chips",
            itemPrice: 9.99,
            itemCount: 2,
        },
        {
            itemImage: "test/nacho-chips.png",
            itemName: "Nacho chips",
            itemPrice: 9.99,
            itemCount: 2,
        },
        {
            itemImage: "test/nacho-chips.png",
            itemName: "Nacho chips",
            itemPrice: 9.99,
            itemCount: 2,
        },
        {
            itemImage: "test/nacho-chips.png",
            itemName: "Nacho chips",
            itemPrice: 9.99,
            itemCount: 2,
        },
        {
            itemImage: "test/nacho-chips.png",
            itemName: "Nacho chips",
            itemPrice: 9.99,
            itemCount: 2,
        },
        {
            itemImage: "test/nacho-chips.png",
            itemName: "Nacho chips",
            itemPrice: 9.99,
            itemCount: 2,
        },
        {
            itemImage: "test/nacho-chips.png",
            itemName: "Nacho chips",
            itemPrice: 9.99,
            itemCount: 2,
        },
        {
            itemImage: "test/nacho-chips.png",
            itemName: "Nacho chips",
            itemPrice: 9.99,
            itemCount: 2,
        },
        {
            itemImage: "test/nacho-chips.png",
            itemName: "Nacho chips",
            itemPrice: 9.99,
            itemCount: 2,
        },
        {
            itemImage: "test/nacho-chips.png",
            itemName: "Nacho chips",
            itemPrice: 9.99,
            itemCount: 2,
        },
        {
            itemImage: "test/nacho-chips.png",
            itemName: "Nacho chips",
            itemPrice: 9.99,
            itemCount: 2,
        },
        {
            itemImage: "test/nacho-chips.png",
            itemName: "Nacho chips",
            itemPrice: 9.99,
            itemCount: 2,
        },
    ];

    // Sign In/Up
    const [selectedLoginItem, setSelectedLoginItem] = useState(null);
    const [selectedSignupItem, setSelectedSignupItem] = useState(null);

    const openLoginModal = () => {
        setSelectedLoginItem();
    };

    const closeLoginModal = () => {
        setSelectedLoginItem(null);
    };

    const openSignupModal = () => {
        setSelectedSignupItem();
    };

    const closeSignupModal = () => {
        setSelectedSignupItem(null);
    };

    // Shopping Cart
    const itemCount = 3; // Item Count Here
    const [selectedCartItem, setSelectedCartItem] = useState(null);
    const openCartModal = () => {
        setSelectedCartItem();
    };

    const closeCartModal = () => {
        setSelectedCartItem(null);
    };

    return (
        <>
            <div className="font-tt-norms-pro px-12 relative z-20">
                <div className="md:flex absolute items-center font-bold text-4xl text-light-secondary hidden top-4 left-8 ">
                    <Link to={"/"}>115A's Diner</Link>
                </div>
                {email ? (
                    <div className="absolute top-4 right-8 ">
                        <div className="flex font-bold items-center gap-3 ">
                            {admin && (
                                <Link to="/admin-dashboard">
                                    <MdOutlineDashboard size={30} />
                                </Link>
                            )}
                            <div className="flex gap-3 items-center ">
                                <button
                                    className="flex items-center text-black rounded-3xl leading-10 px-3"
                                    onClick={() => openCartModal()}
                                >
                                    <IoCartOutline size={30} />
                                    {/* Adjust Item Count here */}
                                    {itemCount > 0 && (
                                        <span className="ml-1">
                                            {itemCount}
                                        </span>
                                    )}
                                </button>
                                <Link to="">
                                    <img
                                        src={
                                            auth.currentUser.photoURL ||
                                            "profile.png"
                                        }
                                        alt="Profile"
                                        className="w-10 h-10 rounded-full"
                                    />
                                </Link>
                                <button
                                    className="px-3 text-black rounded-3xl leading-10"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="absolute top-4 right-8">
                        <div className="flex gap-x-2 font-bold">
                            <button
                                className="px-3 text-black rounded-3xl leading-10"
                                onClick={() => openLoginModal()}
                            >
                                Sign In
                            </button>
                            <button
                                className="px-3 bg-light-secondary rounded-3xl leading-10 text-white"
                                onClick={() => openSignupModal()}
                            >
                                Sign Up
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <Login
                isOpen={selectedLoginItem !== null}
                onClose={closeLoginModal}
                signinSuccess={signinSuccess}
                setSigninSuccess={setSigninSuccess}
            />
            <Signup
                isOpen={selectedSignupItem !== null}
                onClose={closeSignupModal}
                signupSuccess={signupSuccess}
                setSignupSuccess={setSignupSuccess}
            />
            <LpShoppingCart
                isOpen={selectedCartItem !== null}
                onClose={closeCartModal}
                cartItems={cartItems}
            />
        </>
    );
};

export default LpNavBar;
