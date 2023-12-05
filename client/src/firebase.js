import { initializeApp } from "firebase/app";
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    getAdditionalUserInfo,
} from "firebase/auth";

import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    query,
    where,
} from "firebase/firestore";

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

export const writeUserData = async (
    userId,
    name,
    nickname,
    restaurantId,
    email,
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

export const readUserData = async (userId) => {
    try {
        const userQuery = query(
            collection(db, "users"),
            where("userId", "==", userId)
        );
        const querySnapshot = await getDocs(userQuery);

        let userData = null;

        querySnapshot.forEach((doc) => {
            userData = doc.data();
        });

        return userData;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, provider);

        const existingUserData = await readUserData(result.user.uid);

        if (!existingUserData) {
            const docRef = await writeUserData(
                result.user.uid,
                result.user.displayName,
                result.user.displayName,
                0,
                result.user.email,
                result.user.photoURL,
                []
            );
            return docRef.id;
        }
        // else {
        //     alert("User already exists in the database.");
        // }
    } catch (error) {
        console.log(error);
    }
};

export const signUpWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, provider);

        const existingUserData = await readUserData(result.user.uid);

        if (!existingUserData) {
            const docRef = await writeUserData(
                result.user.uid,
                result.user.displayName,
                result.user.displayName,
                0,
                result.user.email,
                result.user.photoURL,
                []
            );
            return docRef.id;
        } else {
            alert("User already exists in the database.");
        }
    } catch (error) {
        console.log(error);
    }
};
