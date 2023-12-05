import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LpNavBar from "../components/landing-page/lpNavBar";
import { auth, readUserData } from "../firebase";

const Profile = () => {
    const { username } = useParams();
    const [nickname, setNickname] = useState(null);

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
            <LpNavBar />
            <div className="flex flex-col justify-center items-center h-screen">
                {nickname}'s Profile
            </div>
        </div>
    );
};

export default Profile;
