import dotenv from "dotenv";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

dotenv.config({ path: "../.env" });
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const writeUserData = async (
    userId,
    name,
    nickname,
    restaurantId,
    email,
    password,
    imageUrl
) => {
    try {
        const docRef = await addDoc(collection(db, "users"), {
            userId: userId,
            username: name,
            nickname: nickname,
            restaurantId: restaurantId,
            email: email,
            profile_picture: imageUrl,
            orderHistory: [],
        });
        console.log("Data written successfully");

        return docRef.id;
    } catch (error) {
        console.error("Error writing data:", error);
    }
};

const updateUserData = async (userId, data) => {
    try {
        const docRef = await addDoc(collection(db, "users"), {
            userId: userId,
            ...data,
        });
        console.log("Data written successfully");

        return docRef.id;
    } catch (error) {
        console.error("Error writing data:", error);
    }
};

const readUserData = async (docId) => {
    try {
        const docRef = await getDocs(collection(db, "users"));
        let userData = null;

        docRef.forEach((doc) => {
            if (doc.id === docId) {
                userData = doc.data();
            }
        });

        return userData; // Return the data explicitly
    } catch (error) {
        console.error(error);
        throw error; // Re-throw the error to propagate it to the caller
    }
};

// writeUserData(
//     "123456",
//     "John Doe",
//     "John",
//     "0",
//     "test@test.com",
//     "password",
//     "imageurl"
// );

readUserData("c877zZfR9mU3wY4FuMVf")
    .then((data) => {
        console.log(data);
    })
    .catch((error) => {
        console.error(error);
    });
