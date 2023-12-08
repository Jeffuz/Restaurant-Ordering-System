import React, { useState, useEffect } from "react";
import LpNavBar from "../components/landing-page/lpNavBar";
import { auth, readUserData } from "../firebase";
import WebSocketService from "../WebSocketService";
import { useCartState } from "./cartState";

const Profile = () => {
    const [nickname, setNickname] = useState(null);

    const { cartItems, cartSize, renderCartSize, removeItemFromCart } =
        useCartState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await readUserData(auth.currentUser.uid);
                setNickname(data.nickname);
            } catch (error) {
                // Handle error (e.g., display an error message)
                console.error("Error fetching user data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <LpNavBar
                cartItems={cartItems}
                cartSize={cartSize}
                renderCartSize={renderCartSize}
                removeFromCart={removeItemFromCart}
                WebSocketService={WebSocketService}
            />
            <div className="flex flex-col justify-center items-center h-screen">
                {nickname}'s Profile
            </div>
        </div>
    );
};

export default Profile;
