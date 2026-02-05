import React from 'react'
import "./App.css";
import {BrowserRouter, Routes,Route} from 'react-router-dom';
import Dashboard from "./Components/Dashboard.jsx";
import SignIn from "./Components/SignIn.jsx";
import Verification from "./Components/Verification.jsx";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<SignIn />} />
                <Route exact path="/dashboard" element={<Dashboard />} />
                <Route exact path="/verify" element={<Verification/>}/>
            </Routes>
        </BrowserRouter>
    )
}
