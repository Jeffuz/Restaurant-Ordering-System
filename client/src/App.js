import "./App.css";
import React, { useEffect, useState } from "react";
import { Routes, Route, HashRouter, useNavigate } from "react-router-dom";

import Menu from "./pages/menu";
import Table from "./pages/table";
import NoPage from "./pages/noPage";

import Admin_dashboard from "./pages/admin-dashboard";
import Landing_page from "./pages/landing-page";

// Websockets
import WebSocketService from "./WebSocketService";
import Profile from "./pages/profile";

import { auth, readUserData } from "./firebase";

function PrivateRoute({ element: Element, ...rest }) {
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAdminStatus = async () => {
            if (auth.currentUser) {
                const uid = auth.currentUser.uid;
                try {
                    const userData = await readUserData(uid);
                    if (userData.restaurantId === "admin") {
                        setIsAdmin(true);
                    } else {
                        setIsAdmin(false);
                        navigate("/"); // Redirect to the home page if not an admin
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
                navigate("/"); // Redirect to the home page if not authenticated
            }
        };

        checkAdminStatus();
    }, [navigate]);

    if (loading) {
        return <div>Loading...</div>; // You can render a loading spinner or a message
    }

    return <Element WebSocketService={WebSocketService} />;
}

function App() {
    // Establish a connection if not already connected
    /*useEffect(() => {
    if (!WebSocketService.socket) {
      WebSocketService.connect();
    }
  }, []);*/

    // broadcastMessage() and crashConnection() are testing functions, don't use them in implementation
    function broadcastMessage() {
        const userInput = prompt("Input message");
        WebSocketService.broadcastMessage(userInput);
    }
    function crashConnection() {
        WebSocketService.socket.close(3333, "Abnormal Disconnect Test");
        return;
    }

    function submitOrder() {
        WebSocketService.submitOrder("Test order");
        return;
    }

    function testId() {
        alert(WebSocketService.id);
    }

    return (
        <div className="App font-tt-norms-pro">
            <HashRouter>
                <Routes>
                    <Route index element={<Landing_page />} />
                    <Route path="/" element={<Landing_page />} />
                    <Route path="/menu" element={<Menu />} />
                    <Route path="/table" element={<Table />} />
                    <Route path="/profile/:username" element={<Profile />} />
                    <Route
                        path="/admin-dashboard"
                        element={<PrivateRoute element={Admin_dashboard} />}
                    />
                    <Route path="*" element={<NoPage />} />
                </Routes>
            </HashRouter>
        </div>
    );
}

export default App;
