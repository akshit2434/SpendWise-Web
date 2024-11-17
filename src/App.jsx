import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage.jsx';
import DuesPage from './DuesPage.jsx';
import HistoryPage from './HistoryPage.jsx';
import Layout from './Layout.jsx';
import { useState, useEffect } from 'react';
import './styles/lib.css';

function App() {
    const API_URL = 'http://192.168.145.176:3000';


    const [user, setUser] = useState(null);
    const fetchUserData = async () => {
        try {
            const response = await fetch(API_URL + '/api/users/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: 'Akshit2434' })
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setUser(data.user);
        } catch (error) {
            return <p>error occured</p>
        } finally {
            setTimeout(() => {
                $(".loader").fadeOut();
            }, 500);
        }
    };
    useEffect(() => {


        fetchUserData();
    }, []);

    return (
        <Router>
            <div className="loader"></div>
            <div className="popup-overlay"></div>
            <Layout>
                {user ? (<>
                    <Routes>

                        <Route path="/" element={<HomePage user={user} fetchUserData={fetchUserData} />} />
                        <Route path="/dues" element={<DuesPage dues={user.dues} userId={user._id} fetchUserData={fetchUserData} />} />
                        <Route path="/history" element={<HistoryPage transactions={user.transactions} userId={user._id} fetchUserData={fetchUserData} />} />
                    </Routes>
                </>) : <p>No user data available</p>}
            </Layout>
        </Router>
    )
}

export default App
